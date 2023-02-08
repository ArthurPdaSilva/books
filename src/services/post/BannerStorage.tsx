import { storage } from "@/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

export default async function BannerStorage(id: string, banner: File) {
  const storageRef = ref(storage, `banners/${id}/${banner.name}`);
  await uploadBytesResumable(storageRef, banner);
  return storageRef;
}
