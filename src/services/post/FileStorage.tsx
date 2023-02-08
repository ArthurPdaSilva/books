import { storage } from "@/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

export default async function FileStorage(id: string, file: File) {
  const storageRef = ref(storage, `files/${id}/${file.name}`);
  await uploadBytesResumable(storageRef, file);
  return storageRef;
}
