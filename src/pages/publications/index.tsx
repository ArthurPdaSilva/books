import React, { useState } from "react";

import styles from "./styles.module.scss";

import PublicationType from "@/@types/PublicationType";

import Carrosel from "@/components/Carrosel";
import Sidebar from "@/components/Sidebar";

import useTheme from "@/hooks/useTheme";

import Head from "next/head";

export default function Publications() {
  const { checked } = useTheme();
  const [myPosts, setMyPosts] = useState<PublicationType[]>([]);

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
            <Carrosel />
          </div>
          <div className={styles.myPosts}>
            <h1>Meus posts</h1>
            <Carrosel />
          </div>
        </div>
      </div>
    </>
  );
}
