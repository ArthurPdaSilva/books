import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

import PublicationType from "@/@types/PublicationType";

import useAuth from "@/hooks/useAuth";

import GetMyPosts from "@/services/post/GetMyPosts";

export default function Carrosel() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<PublicationType[]>([]);

  useEffect(() => {
    async function loadingMyPosts() {
      const posts = await GetMyPosts().then((data) => {
        return data.list;
      });
      const myPosts = posts.filter((item) => item.authorId === user?.uid);
      setMyPosts(myPosts);
    }
    loadingMyPosts();
  }, [user?.uid]);

  return (
    <div className={styles.carrosel}>
      {myPosts?.length === 0 ? (
        <h1>Publique alguma coisa...</h1>
      ) : (
        <>
          {myPosts.map((value) => (
            <a
              href={value.fileUrl}
              style={{
                backgroundImage: `url(${value.bannerUrl})`,
                backgroundSize: "cover",
              }}
              className={styles.rectangle}
              target="_blank"
              download
              rel="noreferrer"
              key={value.uid}
            >
              <span>{value.name}</span>
            </a>
          ))}
          {myPosts.map((value) => (
            <a
              href={value.fileUrl}
              style={{
                backgroundImage: `url(${value.bannerUrl})`,
                backgroundSize: "cover",
              }}
              className={styles.rectangle}
              target="_blank"
              download
              rel="noreferrer"
              key={value.uid}
            >
              <span>{value.name}</span>
            </a>
          ))}
          {myPosts.map((value) => (
            <a
              href={value.fileUrl}
              style={{
                backgroundImage: `url(${value.bannerUrl})`,
                backgroundSize: "cover",
              }}
              className={styles.rectangle}
              target="_blank"
              download
              rel="noreferrer"
              key={value.uid}
            >
              <span>{value.name}</span>
            </a>
          ))}
        </>
      )}
    </div>
  );
}
