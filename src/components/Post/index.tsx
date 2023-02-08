import PublicationType from "@/@types/PublicationType";
import useTheme from "@/hooks/useTheme";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Post({
  authorName,
  bannerUrl,
  fileUrl,
  name,
  likes,
}: PublicationType) {
  const { checked } = useTheme();
  const [clicked, setClicked] = useState(false);

  return (
    <div className={styles.post}>
      <div
        className={checked ? `${styles.user} ${styles.darkPost}` : styles.user}
      >
        <MdAccountCircle size={40} title={authorName} />
        <span>{name}</span>
      </div>
      <a
        href={fileUrl}
        style={{
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: "cover",
        }}
        target="_blank"
        download
        rel="noreferrer"
      ></a>
      <div
        className={
          checked ? `${styles.footer} ${styles.darkPost}` : styles.footer
        }
      >
        {clicked ? (
          <AiFillHeart
            size={30}
            color="red"
            onClick={() => setClicked(!clicked)}
          />
        ) : (
          <AiOutlineHeart
            size={30}
            color="red"
            onClick={() => setClicked(!clicked)}
          />
        )}
        <span>{likes}</span>
        <div className={styles.comment}>
          <textarea placeholder="Adicionar comentário" />
          <AiOutlineSend size={30} />
        </div>
      </div>
    </div>
  );
}
