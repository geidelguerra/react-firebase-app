import * as FirebaseAuth from "firebase/auth";

import firebaseApp from '../firebase';

const auth = FirebaseAuth.getAuth(firebaseApp);

const onSignedIn = (userCredential) => userCredential.user;

export const createUserWithEmailAndPassword = (email, password) => {
  return FirebaseAuth.createUserWithEmailAndPassword(auth, email, password).then(onSignedIn);
};

export const signInWithEmailAndPassword = (email, password) => {
  return FirebaseAuth.signInWithEmailAndPassword(auth, email, password).then(onSignedIn)
};

export const signOut = () => FirebaseAuth.signOut(auth);

export const sendPasswordResetEmail = (email) => FirebaseAuth.sendPasswordResetEmail(auth, email)

export const confirmPasswordReset = (code, password) => FirebaseAuth.confirmPasswordReset(auth, code, password);

export const onAuthStateChanged = (cb) => FirebaseAuth.onAuthStateChanged(auth, cb);
