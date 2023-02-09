import useFirebase from "@/hooks/useFirebase";

import { QueryDocumentSnapshot, DocumentData } from "@/@types/FirebaseType";

import UpdateState from "./UpdateStates";

export default async function GetMorePosts(
  lastDocs: QueryDocumentSnapshot<DocumentData>
) {
  const { getDocs, query, collection, orderBy, db, startAfter, limit } =
    useFirebase();

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
