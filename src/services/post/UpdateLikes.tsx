import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function UpdateLikes(
  uid: string,
  likes: number,
  clicked: boolean
): Promise<string | void> {
  return await updateDoc(doc(db, "posts", uid), {
    likes: likes + (clicked ? 1 : -1),
  });
}
