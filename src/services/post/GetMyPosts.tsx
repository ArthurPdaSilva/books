import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import UpdateState from "./UpdateStates";

export default async function GetMyPosts() {
  const data = await getDocs(
    query(collection(db, "posts"), orderBy("created", "desc"))
  );
  return UpdateState(data);
}
