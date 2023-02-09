import useFirebase from "@/hooks/useFirebase";

import BannerStorage from "./BannerStorage";
import FileStorage from "./FileStorage";

export default async function UpdateFiles(
  postId: string,
  banner: File,
  file: File
): Promise<string | void> {
  const { db, getDownloadURL, updateDoc, doc } = useFirebase();

  const bannerRef = await BannerStorage(postId, banner);
  const bannerUrl = await getDownloadURL(bannerRef).then((url) => url);

  const fileRef = await FileStorage(postId, file);
  const fileUrl = await getDownloadURL(fileRef).then((url) => url);
  return await updateDoc(doc(db, "posts", postId), {
    bannerUrl,
    fileUrl,
  });
}
