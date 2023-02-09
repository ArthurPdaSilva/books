import useFirebase from "@/hooks/useFirebase";

export default async function FileStorage(id: string, file: File) {
  const { storage, ref, uploadBytesResumable } = useFirebase();

  const storageRef = ref(storage, `files/${id}/${file.name}`);
  await uploadBytesResumable(storageRef, file);
  return storageRef;
}
