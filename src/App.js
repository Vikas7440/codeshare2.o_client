import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CodeEditor from './components/Editor';
import { requestNotificationPermission, showNotification } from './utils/notificationHelper';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Request notification permission
    requestNotificationPermission();

    // Socket listeners
    socket.on('connect', () => {
      console.log("Connected to server. Socket ID:", socket.id);
    });

    socket.on('code-update', (newCode) => {
      setCode(newCode);
    });

    socket.on('new-text-notification', (data) => {
      console.log("Received notification event:", data);
      // Only notify if someone else made the change
      if (data.senderId !== socket.id) {
        showNotification("CodeShare 2.0 Update", "Someone added new text to the code!");
      } else {
        console.log("Not showing notification because sender is self.");
      }
    });

    return () => {
      console.log("Cleaning up socket listeners");
      socket.off('code-update');
      socket.off('new-text-notification');
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('code-change', newCode);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CodeShare 2.0</h1>
        <p>Real-time collaborative editor with background notifications</p>
      </header>
      <main style={{ padding: '20px' }}>
        <CodeEditor code={code} setCode={handleCodeChange} />
      </main>
    </div>
  );
}

export default App;
