import React, { useEffect } from 'react';
import { messaging } from "./firebse";
import { getToken, onMessage } from "firebase/messaging";

function FireBaseSetup() {
  const VAPID_KEY = "BJ2J4-D0tp0coQ_vwYrDG5rnuYWjdMllxX_jhPOOI_rqWigspqnbl27i-4OhLVEu16r915hmDWZLf7m29jcm5P8";

  useEffect(() => {
    async function requestPermissionAndToken() {
      try {
        const permission = await Notification.requestPermission();
        console.log('Permission:', permission);

        if (permission === "granted") {
          const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
          if (currentToken) {
            console.log("FCM Token:", currentToken);
          } else {
            console.log("No registration token available.");
          }
        } else if (permission === "denied") {
          alert("You denied the notification permission.");
        }
      } catch (err) {
        console.error("Permission request error:", err);
      }
    }

    requestPermissionAndToken();
  }, []);

  // Listen for foreground messages
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📬 Foreground message received:", payload);
      
      alert(payload.notification.title + "\n" + payload.notification.body);

    });

    return () => unsubscribe();
  }, []);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }
  }, []);

  return null; // No need to render a div unless you want UI
}

export default FireBaseSetup;
