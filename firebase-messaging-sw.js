
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCg_eRbP3B9Y8g8U308sD23MgPP8HnqT6w",
  authDomain: "sinthahousiev2.firebaseapp.com",
  databaseURL: "https://sinthahousiev2-default-rtdb.firebaseio.com",
  projectId: "sinthahousiev2",
  storageBucket: "sinthahousiev2.firebasestorage.app",
  messagingSenderId: "208652536969",
  appId: "1:208652536969:web:08e153afe2794fb6610a58",
  measurementId: "G-5WH1X6308S"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[Background SW] Notification Received: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || 'https://raw.githubusercontent.com/Anandkhuman/Photo/main/logo1.png',
    data: {
      url: self.registration.scope
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data ? event.notification.data.url : '/')
  );
});

