importScripts('https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDkEHqfbE03DIyXyys-pnoJs8-x3OeuIJ0",
  authDomain: "test-firebase-34816.firebaseapp.com",
  projectId: "test-firebase-34816",
  storageBucket: "test-firebase-34816.appspot.com",
  messagingSenderId: "1048984505887",
  appId: "1:1048984505887:web:0e3606404dd1026028cf2a",
  measurementId: "G-Y4PZ80GXYH"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || '/logo192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('http://localhost:5173/') // 👈 customize this
  );
});
