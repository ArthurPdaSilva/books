import PublicationType from "@/@types/PublicationType";
import { db } from "@/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export default async function GetPosts(): Promise<PublicationType[]> {
  const data = await getDocs(
    query(collection(db, "posts"), orderBy("created", "asc"), limit(5))
  )
    .then((snapshot) => {
      const list: PublicationType[] = [];
      snapshot.forEach((doc) => {
        list.push({
          uid: doc.data().uid,
          name: doc.data().name,
          type: doc.data().type,
          likes: doc.data().likes,
          authorId: doc.data().authorId,
          authorName: doc.data().authorName,
          bannerUrl: doc.data().bannerUrl,
          fileUrl: doc.data().fileUrl,
          created: doc.data().created,
        });
      });
      return list;
    })
    .catch((e) => {
      throw new Error(e);
    });
  return data;
}
