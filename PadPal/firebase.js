import { getAuth } from "firebase/auth";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db };
