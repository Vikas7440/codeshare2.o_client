export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission !== "denied") {
        console.log("Requesting notification permission...");
        const permission = await Notification.requestPermission();
        console.log("Notification permission result:", permission);
        return permission === "granted";
    }

    return false;
};

export const showNotification = (title, body) => {
    console.log("showNotification called:", { title, body, hidden: document.hidden, permission: Notification.permission });
    // Only show notification if the document is hidden (user is on another tab)
    if (document.hidden && Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: "/favicon.ico"
        });
    } else {
        console.log("Notification suppressed (tab not hidden or permission not granted)");
    }
};
