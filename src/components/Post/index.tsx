import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Post() {
  return (
    <div className={styles.public}>
      <div className={styles.headerContent}>
        <MdAccountCircle size={40} />
        Nome do usuário
      </div>
      <div className={styles.image}>
        <a href="/images/myw3schoolsimage.jpg" download>
          <Image
            src="/teste.png"
            alt="Poster do material"
            width={250}
            height={400}
          />
        </a>
        <div className={styles.footer}>
          <AiOutlineHeart size={30} color="red" />
          <div className={styles.comment}>
            <textarea placeholder="Adicionar comentário" />
            <AiOutlineSend size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
