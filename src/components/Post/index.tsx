import useTheme from "@/hooks/useTheme";
import React from "react";
import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Post() {
  const { checked } = useTheme();

  return (
    <div
      className={styles.post}
      style={{ backgroundImage: "url(/teste.png)", backgroundSize: "cover" }}
    >
      <div
        className={checked ? `${styles.user} ${styles.darkPost}` : styles.user}
      >
        <MdAccountCircle size={40} title="Usuário" />
        <span>As cascatas</span>
      </div>
      <div
        className={
          checked ? `${styles.footer} ${styles.darkPost}` : styles.footer
        }
      >
        <AiOutlineHeart size={30} color="red" />
        <div className={styles.comment}>
          <textarea placeholder="Adicionar comentário" />
          <AiOutlineSend size={30} />
        </div>
      </div>
    </div>
  );
}
