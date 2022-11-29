import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const otherProjectFirebaseConfig = {
  apiKey: "AIzaSyAplzOWq-I2o0t0EBAM7HR5fvzaSdiJkFo",
  authDomain: "cs35l-a7b47.firebaseapp.com",
  projectId: "cs35l-a7b47",
  storageBucket: "cs35l-a7b47.appspot.com",
  messagingSenderId: "626935676200",
  appId: "1:626935676200:web:769db5f99adc2bf06be41d"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const otherProject = firebase.initializeApp(otherProjectFirebaseConfig, "other");
export const auth = getAuth(firebaseApp);
export const db = getFirestore(otherProject);