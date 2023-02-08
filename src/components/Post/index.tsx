import PublicationType from "@/@types/PublicationType";
import useTheme from "@/hooks/useTheme";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Post({
  authorName,
  bannerUrl,
  fileUrl,
  name,
  photoUser,
}: PublicationType) {
  const { checked } = useTheme();

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
        <div className={styles.comment}>
          <textarea placeholder="Enviar um comentário" />
          <AiOutlineSend size={30} />
        </div>
      </div>
    </div>
  );
}
