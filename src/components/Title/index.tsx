import useTheme from "@/hooks/useTheme";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

interface TitleProps {
  header: string;
  linkText: string;
  link: string;
}

export default function Title({ header, linkText, link }: TitleProps) {
  const { checked } = useTheme();

  return (
    <div
      className={
        linkText === "Voltar" ? `${styles.title} ${styles.back}` : styles.title
      }
    >
      <h1 className={checked ? styles.darkTitle : styles.whiteTitle}>
        {header}
      </h1>
      <Link
        href={link}
        className={checked ? styles.darkButton : styles.whiteButton}
      >
        {linkText}
      </Link>
    </div>
  );
}
