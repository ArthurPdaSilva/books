import PublicationType from "@/@types/PublicationType";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import UpdateLikes from "@/services/post/UpdateLikes";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

export default function Post({
  authorName,
  bannerUrl,
  fileUrl,
  name,
  likes,
  photoUser,
  uid,
}: PublicationType) {
  const { user, newPostLike } = useAuth();
  const { checked } = useTheme();
  const [clicked, setClicked] = useState(
    user?.likesPosts.includes(uid) as boolean
  );
  const [like, setLike] = useState(likes);
  const [message, setMessage] = useState("");

  const handleSend = useCallback(async () => {
    setMessage("");
    toast.info("Mensagem enviada ao usuário :)");
  }, []);

  const handleLikes = useCallback(async () => {
    const likesPosts = user?.likesPosts as string[];
    if (likesPosts.includes(uid)) {
      const news: string[] = likesPosts.filter(
        (value) => value !== (uid as string)
      );
      await UpdateLikes(uid, likes, false).then(() => {
        newPostLike(news);
        setLike(like - 1);
      });
    } else {
      likesPosts.push(uid);
      await UpdateLikes(uid, likes, true).then(() => {
        newPostLike(likesPosts);
        setLike(like + 1);
      });
    }
    setClicked(!clicked);
  }, [clicked, like, likes, newPostLike, uid, user?.likesPosts]);

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
      >
        {clicked ? (
          <AiFillHeart size={30} color="red" onClick={handleLikes} />
        ) : (
          <AiOutlineHeart size={30} color="red" onClick={handleLikes} />
        )}
        <span>{like}</span>
        <span className={styles.comment}>{authorName}</span>
      </div>
    </div>
  );
}
