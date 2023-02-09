import useFirebase from "@/hooks/useFirebase";

export default async function PhotoStorage(id: string, imageAvatar: File) {
  const { storage, ref, uploadBytesResumable } = useFirebase();

  const storageRef = ref(storage, `images/${id}/${imageAvatar.name}`);
  await uploadBytesResumable(storageRef, imageAvatar);
  return storageRef;
}
