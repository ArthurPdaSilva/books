import PublicationType from "@/@types/PublicationType";

import useFirebase from "@/hooks/useFirebase";

export default async function AddPost(post: PublicationType): Promise<void> {
  const { db, doc, setDoc } = useFirebase();

  await setDoc(doc(db, `posts/${post.uid}`), post);
}
