import { db } from "@/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import UpdateState from "./UpdateStates";

export default async function GetPosts() {
  const data = await getDocs(
    query(collection(db, "posts"), orderBy("created", "desc"), limit(6))
  );
  return UpdateState(data);
}
