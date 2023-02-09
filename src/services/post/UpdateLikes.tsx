import useFirebase from "@/hooks/useFirebase";

export default async function UpdateLikes(
  uid: string,
  likes: number,
  value: number
): Promise<string | void> {
  const { db, doc, updateDoc } = useFirebase();

  return await updateDoc(doc(db, "posts", uid), {
    likes: likes + value,
  });
}
