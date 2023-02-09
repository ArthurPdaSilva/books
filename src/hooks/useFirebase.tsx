import { auth, db, storage } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function useFirebase() {
  return {
    db,
    auth,
    storage,
    doc,
    setDoc,
    ref,
    uploadBytesResumable,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    getDownloadURL,
    updateDoc,
    getDoc,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
