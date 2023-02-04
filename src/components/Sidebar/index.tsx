import Link from "next/link";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  MdAccountCircle,
  MdHome,
  MdFavorite,
  MdAssignment,
  MdExitToApp,
  MdSettings,
  MdList,
} from "react-icons/md";

export default function Sidebar() {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <div className={styles.sidebar}>
      <Link href="/profile">
        <MdAccountCircle size={192} color="#fff" />
      </Link>

      <MdList size={50} onClick={() => setDisplayMenu(!displayMenu)} />

      <ul
        className={
          displayMenu ? styles.menu : `${styles.menu} ${styles.menuChecked}`
        }
      >
        <Link className={styles.groupLink} href="/dashboard">
          <MdHome size={42} />
          Tela Inicial
        </Link>
        <Link className={styles.groupLink} href="/favoritos">
          <MdFavorite size={42} />
          Favoritos
        </Link>
        <Link className={styles.groupLink} href="/publicacoes">
          <MdAssignment size={42} />
          Publicações
        </Link>
        <Link className={styles.groupLink} href="/profile">
          <MdSettings size={42} />
          Perfil
        </Link>
        <button className={styles.groupLink}>
          <MdExitToApp size={42} />
          Sair
        </button>
      </ul>
    </div>
  );
}
