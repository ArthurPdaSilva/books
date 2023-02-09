import styles from "./styles.module.scss";

import Carrosel from "@/components/Carrosel";
import Sidebar from "@/components/Sidebar";

import useTheme from "@/hooks/useTheme";

import Head from "next/head";

export default function Publications() {
  const { checked } = useTheme();

  return (
    <>
      <Head>
        <title>Books - Minhas publicações</title>
      </Head>
      <div className={checked ? styles.containerDark : styles.containerLight}>
        <Sidebar />
        <div className={styles.content}>
          <h1>Minhas publicações</h1>
          <Carrosel />
        </div>
      </div>
    </>
  );
}
