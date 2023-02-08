import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  startAt,
} from "firebase/firestore";
import UpdateState from "./UpdateStates";

export default async function GetMorePosts(
  lastDocs: QueryDocumentSnapshot<DocumentData>
) {
  const data = await getDocs(
    query(
      collection(db, "posts"),
      orderBy("created", "desc"),
      startAfter(lastDocs),
      limit(3)
    )
  );
  return UpdateState(data);
}
