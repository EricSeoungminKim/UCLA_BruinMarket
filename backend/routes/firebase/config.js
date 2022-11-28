// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  // storageBucket: "uclabruinmarket.appspot.com",
  // messagingSenderId: "56072914377",
  // appId: "1:56072914377:web:da014c7492d60689765418",
  // measurementId: "G-2FJ8MG472T",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// firebase.analytics();

export default firebaseApp;
