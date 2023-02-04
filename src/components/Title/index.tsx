import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

export default function Title() {
  return (
    <div className={styles.title}>
      <h1>Minhas Publicações</h1>
      <Link href="/createPublications">Publicar mais</Link>
    </div>
  );
}
