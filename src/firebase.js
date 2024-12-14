// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:String(import.meta.env.VITE_FIREBASE_API_KEY) ,
  authDomain:String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) ,
  projectId:String(import.meta.env.VITE_FIREBASE_PROJECT_ID) ,
  storageBucket:String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) ,
  messagingSenderId:String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) ,
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID)
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();