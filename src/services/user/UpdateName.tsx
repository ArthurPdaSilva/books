import useFirebase from "@/hooks/useFirebase";

export default async function UpdateName(
  id: string,
  name: string
): Promise<string | void> {
  const { db, updateDoc, doc } = useFirebase();

  return await updateDoc(doc(db, "users", id), {
    name: name,
  })
    .then(() => {
      return name;
    })
    .catch((e) => {
      throw new Error(e);
    });
}
