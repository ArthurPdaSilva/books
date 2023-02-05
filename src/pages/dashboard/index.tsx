import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import styles from "./styles.module.scss";

export default function Dashboard() {
  const { checked } = useTheme();

  return (
    <>
      <Head>
        <title>Books - Bem vindo a plataforma</title>
      </Head>
      <div className={checked ? styles.containerDark : styles.containerLight}>
        <Sidebar />
        <div className={styles.content}>
          <Title header="Publicações" linkText="Publicar" link="/new" />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
}
