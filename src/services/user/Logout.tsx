import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export default async function Logout() {
  await signOut(auth);
}
