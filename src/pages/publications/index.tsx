import Carrosel from "@/components/Carrosel";
import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import Head from "next/head";
import styles from "./styles.module.scss";

export default function Publications() {
  return (
    <>
      <Head>
        <title>Books - Bem vindo a plataforma</title>
      </Head>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Title />
          <Carrosel />
        </div>
      </div>
    </>
  );
}
