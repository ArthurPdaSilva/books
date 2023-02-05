import { storage } from "@/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

export default async function PhotoStorage(id: string, imageAvatar: File) {
  const storageRef = ref(storage, `images/${id}/${imageAvatar.name}`);
  await uploadBytesResumable(storageRef, imageAvatar);
  return storageRef;
}
