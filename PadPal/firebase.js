import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDJPce2ZbJRG4nWc3tKWcFYxysbhpczWw",
  authDomain: "padpal-ba095.firebaseapp.com",
  projectId: "padpal-ba095",
  storageBucket: "padpal-ba095.appspot.com",
  messagingSenderId: "158809196140",
  appId: "1:158809196140:web:a548092ca04d96aad07a49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
