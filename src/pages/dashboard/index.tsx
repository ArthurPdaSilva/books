import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
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
          <div className={styles.pub}>
            <h1>Publicações</h1>
            <Link href="/new">
              <FiPlus color="#fff" size={50} />
            </Link>
          </div>
          <div className={styles.containerPost}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </>
  );
}
