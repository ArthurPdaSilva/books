import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

initializeApp({
  apiKey: "AIzaSyCa2fbXcxxz60442o_Z3CrcTX5QcOei0mk",
  authDomain: "books-fd785.firebaseapp.com",
  projectId: "books-fd785",
  storageBucket: "books-fd785.appspot.com",
  messagingSenderId: "469025272222",
  appId: "1:469025272222:web:c36e1593c7764abf93268f",
  measurementId: "G-7WV9K13HMN",
});

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
