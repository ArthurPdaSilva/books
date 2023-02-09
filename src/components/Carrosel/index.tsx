import React from "react";
import styles from "./styles.module.scss";

import PublicationType from "@/@types/PublicationType";

interface PostsProp {
  posts: PublicationType[];
}

export default function Carrosel({ posts }: PostsProp) {
  return (
    <div className={styles.carrosel}>
      {posts.length === 0 ? (
        <h1>Publique alguma coisa...</h1>
      ) : (
        <>
          {posts.map((value) => (
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
