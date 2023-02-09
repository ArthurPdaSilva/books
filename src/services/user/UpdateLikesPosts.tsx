import useFirebase from "@/hooks/useFirebase";

export default async function UpdateLikesPosts(
  uid: string,
  likesPosts: string[]
): Promise<string | void> {
  const { db, updateDoc, doc } = useFirebase();

  return await updateDoc(doc(db, "users", uid), {
    likesPosts: likesPosts,
  });
}
