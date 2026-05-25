
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

// Handle background messaging delivery safely
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Agar browser ne automatic notification pehle hi show kar diya hai, toh manually show nahi karenge (duplicates se bachne ke liye)
  if (payload.notification) {
    return;
  }

  // Agar sirf data-only payload hai, toh hi manually show karenge
  if (payload.data) {
    const notificationTitle = payload.data.title || "SINTHA HOUSIE Update";
    const notificationOptions = {
      body: payload.data.body || "A new update has been received.",
      icon: 'https://raw.githubusercontent.com/Anandkhuman/Photo/main/logo1.png',
      badge: 'https://raw.githubusercontent.com/Anandkhuman/Photo/main/logo1.png',
      data: {
        click_action: payload.data.click_action || '/'
      }
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

// Handle notification click: notification par click karne par website open hogi ya active tab focus ho jayega
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Redirect target URL
  const targetUrl = event.notification.data?.click_action || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Agar website pehle se kisi tab mein open hai, toh use focus karein
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Agar pehle se open nahi hai, toh naya tab open karein
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
