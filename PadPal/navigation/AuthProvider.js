import { auth } from "../firebase";
import React, { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, storage } from "../firebase";
import { doc, deleteDoc, addDoc, collection, setDoc } from "firebase/firestore";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password , username, name) => {
          
          try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then( async () => {
              const {uid} = auth.currentUser;
              console.log("=============UID==========");
              console.log(uid);
              console.log("=============UID==========");


              await setDoc(doc(db, "users", uid), {
                name: name,
                username: username,
                email: email,
                userId: uid
              });
              console.log("User Created in firestore")
            })
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await signOut(auth);
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
