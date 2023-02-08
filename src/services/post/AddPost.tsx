import PublicationType from "@/@types/PublicationType";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function AddPost(post: PublicationType): Promise<void> {
  await setDoc(doc(db, `posts/${post.uid}`), post);
}
