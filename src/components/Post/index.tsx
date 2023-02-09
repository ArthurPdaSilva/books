import React, { useState, useCallback } from "react";
import styles from "./styles.module.scss";

import PublicationType from "@/@types/PublicationType";

import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import useIcons from "@/hooks/useIcons";

import Image from "next/image";

export default function Post({
  authorName,
  bannerUrl,
  fileUrl,
  name,
  photoUser,
  uid,
}: PublicationType) {
  const { user, newPostLike } = useAuth();
  const { checked } = useTheme();
  const { AiFillHeart, AiOutlineHeart, MdAccountCircle } = useIcons();

  const [clicked, setClicked] = useState(
    user?.likesPosts.includes(uid) as boolean
  );

  const loadingLikes = useCallback(() => {
    const likesPosts = user?.likesPosts as string[];
    if (clicked) {
      const news: string[] = likesPosts.filter(
        (value) => value !== (uid as string)
      );
      newPostLike(news);
      setClicked(false);
    } else {
      likesPosts.push(uid);
      newPostLike(likesPosts);
      setClicked(true);
    }
  }, [clicked, newPostLike, uid, user?.likesPosts]);

  return (
    <div className={styles.post}>
      <div
        className={checked ? `${styles.user} ${styles.darkPost}` : styles.user}
      >
        {photoUser.length <= 1 ? (
          <MdAccountCircle size={40} title={authorName} />
        ) : (
          <Image
            width={32}
            height={32}
            src={photoUser}
            title={authorName}
            alt="Foto do usuário"
          />
        )}
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
        onClick={loadingLikes}
      >
        {clicked ? (
          <AiFillHeart size={30} color="red" />
        ) : (
          <AiOutlineHeart size={30} color="red" />
        )}
        <span className={styles.comment}>{authorName}</span>
      </div>
    </div>
  );
}
