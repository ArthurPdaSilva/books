import useFirebase from "@/hooks/useFirebase";

export default async function BannerStorage(id: string, banner: File) {
  const { storage, ref, uploadBytesResumable } = useFirebase();

  const storageRef = ref(storage, `banners/${id}/${banner.name}`);
  await uploadBytesResumable(storageRef, banner);
  return storageRef;
}
