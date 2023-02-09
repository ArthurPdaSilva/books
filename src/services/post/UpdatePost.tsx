import PublicationType from "@/@types/PublicationType";

import useFirebase from "@/hooks/useFirebase";

export default async function UpdatePost(
  post: PublicationType
): Promise<string | void> {
  const { db, doc, updateDoc } = useFirebase();

  return await updateDoc(doc(db, "posts", post.uid), {
    authorName: post.authorName,
    photoUser: post.photoUser,
  });
}
