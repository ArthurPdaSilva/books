import useFirebase from "@/hooks/useFirebase";

import UpdateState from "./UpdateStates";

export default async function GetMyPosts() {
  const { getDocs, query, collection, orderBy, db } = useFirebase();

  const data = await getDocs(
    query(collection(db, "posts"), orderBy("created", "desc"))
  );
  return UpdateState(data);
}
