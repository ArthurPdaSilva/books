import PublicationType from "@/@types/PublicationType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export default function UpdateState(data: QuerySnapshot<DocumentData>) {
  let list: PublicationType[] = [];
  data.forEach((doc) => {
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
  const lastDoc = data.docs[data.docs.length - 1];
  const datas = {
    list,
    lastDoc,
  };

  return datas;
}
