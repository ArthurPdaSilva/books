import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function UpdateLikesPosts(
  uid: string,
  likesPosts: string[]
): Promise<string | void> {
  return await updateDoc(doc(db, "users", uid), {
    likesPosts: likesPosts,
  });
}
