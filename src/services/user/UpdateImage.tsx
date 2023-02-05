import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, StorageReference } from "firebase/storage";

export default async function UpdateImagem(
  id: string,
  storageRef: StorageReference
): Promise<string | void> {
  return await getDownloadURL(storageRef).then(async (url) => {
    const urlFoto = url;
    return await updateDoc(doc(db, "users", id), {
      avatarUrl: urlFoto,
    })
      .then(() => {
        return urlFoto;
      })
      .catch((e) => {
        throw new Error(e);
      });
  });
}
