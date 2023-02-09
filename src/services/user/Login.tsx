import UserType from "@/@types/UserType";

import useFirebase from "@/hooks/useFirebase";

export default async function Login(
  email: string,
  password: string
): Promise<UserType | null> {
  const { db, signInWithEmailAndPassword, auth, getDoc, doc } = useFirebase();

  const data = await signInWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      const uid = value.user.uid;
      const userProfile = await getDoc(doc(db, `users/${uid}`));
      return {
        uid: uid,
        name: userProfile.data()?.name || "",
        email: userProfile.data()?.email || "",
        avatarUrl: userProfile.data()?.avatarUrl || " ",
        likesPosts: userProfile.data()?.likesPosts || [],
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
  return data;
}
