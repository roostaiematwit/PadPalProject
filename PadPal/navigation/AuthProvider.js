import { auth } from "../firebase";
import React, { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
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
