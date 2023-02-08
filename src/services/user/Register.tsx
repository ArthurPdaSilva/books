import UserType from "@/@types/UserType";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default async function Register(
  email: string,
  password: string,
  name: string
): Promise<UserType | null> {
  const data = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      const uid = value.user.uid;
      await setDoc(doc(db, `users/${uid}`), {
        uid: uid,
        name,
        avatarUrl: " ",
        email,
      });
      return {
        uid: uid,
        name,
        avatarUrl: " ",
        email,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
  return data;
}
