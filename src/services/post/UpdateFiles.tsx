import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, StorageReference } from "firebase/storage";
import BannerStorage from "./BannerStorage";
import FileStorage from "./FileStorage";

export default async function UpdateFiles(
  postId: string,
  banner: File,
  file: File
): Promise<string | void> {
  const bannerRef = await BannerStorage(postId, banner);
  const bannerUrl = await getDownloadURL(bannerRef).then((url) => url);

  const fileRef = await FileStorage(postId, file);
  const fileUrl = await getDownloadURL(fileRef).then((url) => url);
  return await updateDoc(doc(db, "posts", postId), {
    bannerUrl,
    fileUrl,
  });
}
