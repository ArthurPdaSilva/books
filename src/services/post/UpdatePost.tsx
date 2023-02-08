import PublicationType from "@/@types/PublicationType";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function UpdatePost(
  post: PublicationType
): Promise<string | void> {
  return await updateDoc(doc(db, "posts", post.uid), {
    authorName: post.authorName,
    photoUser: post.photoUser,
  });
}
