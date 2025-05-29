import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDkEHqfbE03DIyXyys-pnoJs8-x3OeuIJ0",
  authDomain: "test-firebase-34816.firebaseapp.com",
  projectId: "test-firebase-34816",
  storageBucket: "test-firebase-34816.appspot.com",
  messagingSenderId: "1048984505887",
  appId: "1:1048984505887:web:0e3606404dd1026028cf2a",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)