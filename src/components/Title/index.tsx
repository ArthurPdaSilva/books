import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

interface TitleProps {
  header: string;
  linkText: string;
  link: string;
}

export default function Title({ header, linkText, link }: TitleProps) {
  return (
    <div
      className={
        linkText === "Voltar" ? `${styles.title} ${styles.back}` : styles.title
      }
    >
      <h1>{header}</h1>
      <Link href={link}>{linkText}</Link>
    </div>
  );
}
