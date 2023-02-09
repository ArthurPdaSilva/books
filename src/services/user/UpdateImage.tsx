import useFirebase from "@/hooks/useFirebase";

import { StorageReference } from "@/@types/FirebaseType";

export default async function UpdateImagem(
  id: string,
  storageRef: StorageReference
): Promise<string | void> {
  const { doc, db, getDownloadURL, updateDoc } = useFirebase();

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
