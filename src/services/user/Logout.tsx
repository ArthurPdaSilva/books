import useFirebase from "@/hooks/useFirebase";

export default async function Logout() {
  const { auth, signOut } = useFirebase();
  await signOut(auth);
}
