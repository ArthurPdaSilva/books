import UserType from "@/@types/UserType";

import useFirebase from "@/hooks/useFirebase";

export default async function Register(
  email: string,
  password: string,
  name: string
): Promise<UserType | null> {
  const { auth, createUserWithEmailAndPassword, setDoc, doc, db } =
    useFirebase();

  const data = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      const uid = value.user.uid;
      await setDoc(doc(db, `users/${uid}`), {
        uid: uid,
        name,
        avatarUrl: " ",
        email,
        likesPosts: [],
      });
      return {
        uid: uid,
        name,
        avatarUrl: " ",
        email,
        likesPosts: [],
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
  return data;
}
