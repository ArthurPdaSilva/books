import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function UpdateName(
  id: string,
  name: string
): Promise<string | void> {
  return await updateDoc(doc(db, "users", id), {
    name: name,
  })
    .then(() => {
      return name;
    })
    .catch((e) => {
      throw new Error(e);
    });
}
