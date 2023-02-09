import PublicationType from "@/@types/PublicationType";
import UserType from "@/@types/UserType";
import useFirebase from "@/hooks/useFirebase";

export default async function GetLikesPosts(likesPosts: string[]) {
  const { db, getDoc, doc } = useFirebase();
  let lista: PublicationType[] = [];
  for (let c = 0; c < likesPosts.length; c++) {
    let post = await getDoc(doc(db, `posts/${likesPosts[c]}`)).then((value) =>
      value.data()
    );
    lista.push(post as PublicationType);
  }
  return lista;
}
