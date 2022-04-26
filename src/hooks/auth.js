import React, { useState, useEffect, useContext, createContext } from "react";
import * as AuthService from '../services/auth';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const signInWithEmailAndPassword = (email, password) => {
    return AuthService.signInWithEmailAndPassword(email, password).then((user) => {
      setUser(user);

      return user;
    });
  };

  const createUserWithEmailAndPassword = (email, password) => {
    return AuthService.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user);

        return user;
      });
  };

  const signOut = () => {
    return AuthService.signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return AuthService.sendPasswordResetEmail(email).then(() => true);
  };

  const confirmPasswordReset = (code, password) => {
    return AuthService.confirmPasswordReset(code, password).then(() => true);
  };

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
