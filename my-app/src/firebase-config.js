// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAplzOWq-I2o0t0EBAM7HR5fvzaSdiJkFo",
  authDomain: "cs35l-a7b47.firebaseapp.com",
  projectId: "cs35l-a7b47",
  storageBucket: "cs35l-a7b47.appspot.com",
  messagingSenderId: "626935676200",
  appId: "1:626935676200:web:d8727198eeac83a76be41d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
