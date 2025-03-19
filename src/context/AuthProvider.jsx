import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // createUser
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // loginUser
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // logout
  const logoutUser = () => {
    setUser("");
    return signOut(auth);
  };
  // social login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // unsubscribe
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        if (user?.email) {
          const userInfo = { email: user?.email };
          axios
            .post("http://localhost:5000/jwt", userInfo, {
              withCredentials: true,
            })
            .then((res) => {
              console.log("login", res.data);
              setLoading(false);
            });
        }

        setLoading(false);

        // ...
      } else {
        console.log("user is logout");
        axios
          .post("http://localhost:5000/lout", {}, { withCredentials: true })
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    logoutUser,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
