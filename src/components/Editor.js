import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const CodeEditor = ({ code, setCode }) => {
    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: '#f8f9fa'
        }}>
            <Editor
                className="code-editor-inner"
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    outline: 'none',
                    border: 'none',
                    height: '100%',
                    width: '100%'
                }}
            />
        </div>
    );
};

export default CodeEditor;
