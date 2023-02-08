import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import styles from "./styles.module.scss";
import { useCallback, useEffect, useState } from "react";
import PublicationType from "@/@types/PublicationType";
import GetPosts from "@/services/post/GetPosts";
import GetMorePosts from "@/services/post/GetMorePost";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const { checked } = useTheme();
  const [posts, setPosts] = useState<PublicationType[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    async function loadingPosts() {
      const posts = await GetPosts().then((data) => {
        return data;
      });
      setPosts(posts.list);
      setLastDoc(posts.lastDoc);
    }

    loadingPosts();
  }, []);

  const handleScroll = useCallback(
    async (e: React.UIEvent<HTMLElement>) => {
      const scroll = e.currentTarget;
      if (scroll.scrollHeight - scroll.scrollTop === scroll.offsetHeight) {
        if (lastDoc !== undefined) {
          const restPost = await GetMorePosts(
            lastDoc as QueryDocumentSnapshot<DocumentData>
          ).then((data) => {
            return data;
          });

          setPosts([...posts, ...restPost.list]);
          setLastDoc(restPost.lastDoc);
        }
      }
    },
    [lastDoc, posts]
  );

  return (
    <>
      <Head>
        <title>Books - Bem vindo a plataforma</title>
      </Head>
      <div className={checked ? styles.containerDark : styles.containerLight}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.pub}>
            <h1>Publicações</h1>
            <Link href="/new">
              <FiPlus color="#fff" size={50} />
            </Link>
          </div>
          <div className={styles.containerPost} onScroll={handleScroll}>
            {posts.length === 0 && <h1>Carregando postagens...</h1>}
            {posts.map((value) => (
              <Post
                key={value.uid}
                uid={value.uid}
                name={value.name}
                authorName={value.authorName}
                authorId={value.authorId}
                type={value.type}
                bannerUrl={value.bannerUrl}
                fileUrl={value.fileUrl}
                likes={value.likes}
                created={value.created}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
