// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';  // Import Firebase Authentication


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHaQodYotsBaJcyMeHKerrImvTRZflSjk",
  authDomain: "mov-upload-web.firebaseapp.com",
  databaseURL: "https://mov-upload-web-default-rtdb.firebaseio.com",
  projectId: "mov-upload-web",
  storageBucket: "mov-upload-web.appspot.com",
  messagingSenderId: "537421557022",
  appId: "1:537421557022:web:cbde009cfad2986784ad0f",
  measurementId: "G-7XL9C196CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth(app);  // Initialize Firebase Authentication
