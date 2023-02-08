import UserType from "@/@types/UserType";
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default async function Login(
  email: string,
  password: string
): Promise<UserType | null> {
  const data = await signInWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      const uid = value.user.uid;
      const userProfile = await getDoc(doc(db, `users/${uid}`));
      return {
        uid: uid,
        name: userProfile.data()?.name || "",
        email: userProfile.data()?.email || "",
        avatarUrl: userProfile.data()?.avatarUrl || "",
        publications: userProfile.data()?.publications,
        likePosts: userProfile.data()?.likePosts,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
  return data;
}
