import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import PublicationType from "@/@types/PublicationType";

import Carrosel from "@/components/Carrosel";
import Sidebar from "@/components/Sidebar";

import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";

import GetMyPosts from "@/services/post/GetMyPosts";
import GetLikesPosts from "@/services/post/GetLikesPosts";

import Head from "next/head";
import UserType from "@/@types/UserType";

export default function Publications() {
  const { user } = useAuth();
  const { checked } = useTheme();
  const [myPosts, setMyPosts] = useState<PublicationType[]>([]);
  const [likesPosts, setLikesPosts] = useState<PublicationType[]>([]);

  useEffect(() => {
    async function loadingPosts() {
      const posts = await GetMyPosts().then((data) => {
        return data.list;
      });
      const myPosts = posts.filter((item) => item.authorId === user?.uid);
      setMyPosts(myPosts);

      const n = user as UserType;
      const likesPosts = await GetLikesPosts(n.likesPosts);
      setLikesPosts(likesPosts);
    }

    loadingPosts();
  }, [user, user?.uid]);

  return (
    <>
      <Head>
        <title>Books - Minhas publicações</title>
      </Head>
      <div className={checked ? styles.containerDark : styles.containerLight}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.likePosts}>
            <h1>Curtidas</h1>
            <Carrosel posts={likesPosts} />
          </div>
          <div className={styles.myPosts}>
            <h1>Meus posts</h1>
            <Carrosel posts={myPosts} />
          </div>
        </div>
      </div>
    </>
  );
}
