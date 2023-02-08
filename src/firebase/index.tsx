import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

initializeApp({
  apiKey: "AIzaSyCFEy0wHpUo1EVIW-yD8oamguOaQy3-CQM",
  authDomain: "books-badc4.firebaseapp.com",
  projectId: "books-badc4",
  storageBucket: "books-badc4.appspot.com",
  messagingSenderId: "219127756321",
  appId: "1:219127756321:web:c69d3fb26849c590ac9560",
  measurementId: "G-14P02ZJB5E",
});

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
