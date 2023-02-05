import Carrosel from "@/components/Carrosel";
import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import styles from "./styles.module.scss";

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
          <Title
            header="Minhas publicações"
            link="/new"
            linkText="Publicar mais"
          />
          <Carrosel />
        </div>
      </div>
    </>
  );
}
