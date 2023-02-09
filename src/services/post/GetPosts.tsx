import useFirebase from "@/hooks/useFirebase";

import UpdateState from "./UpdateStates";

export default async function GetPosts() {
  const { getDocs, query, collection, orderBy, db, limit } = useFirebase();
  const data = await getDocs(
    query(collection(db, "posts"), orderBy("created", "desc"), limit(6))
  );
  return UpdateState(data);
}
