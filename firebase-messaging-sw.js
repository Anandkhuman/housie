importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// IMPORTANT: Your Firebase project configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB2imEIvh_bWbYD_yPB7p3af7bV9OWdA5A",
    authDomain: "sinthahousie-1dd3b.firebaseapp.com",
    databaseURL: "https://sinthahousie-1dd3b-default-rtdb.firebaseio.com",
    projectId: "sinthahousie-1dd3b",
    storageBucket: "sinthahousie-1dd3b.firebasestorage.app",
    messagingSenderId: "76567991256",
    appId: "1:76567991256:web:c58b127b8d86d8a1c598ad",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// This listener handles messages received when the app is in the background or terminated.
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message: ', payload);

    // Customize the notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        // IMPORTANT: Create an icon for your notifications
        icon: 'https://raw.githubusercontent.com/Anandkhuman/Photo/main/logo1.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});