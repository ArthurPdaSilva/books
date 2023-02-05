import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import styles from "./styles.module.scss";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Books - Bem vindo a plataforma</title>
      </Head>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
}
