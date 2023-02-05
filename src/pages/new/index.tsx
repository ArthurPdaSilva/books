import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import { MdOutlineFileUpload } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Publications() {
  const { checked } = useTheme();

  return (
    <>
      <Head>
        <title>Books - Criando publicação</title>
      </Head>
      <div className={checked ? styles.containerDark : styles.containerLight}>
        <Sidebar />
        <div className={styles.content}>
          <Title
            header="Criando publicação"
            link="/publications"
            linkText="Voltar"
          />
          <form className={styles.forms}>
            <h2>Cadastrar Material</h2>
            <input type="text" placeholder="Nome do Material" />
            <select>
              <option value="">Tipo do Material</option>
              <option value="">Livro</option>
              <option value="">Poema</option>
              <option value="">Conselho</option>
              <option value="">Reflexão</option>
            </select>
            <label className={styles.labelFile}>
              Thumbnail:
              <MdOutlineFileUpload color="#fff" size={30} />
              <input type="file" accept="image/*" placeholder="Enviar imagem" />
            </label>
            <label className={styles.labelFile}>
              Arquivo:
              <MdOutlineFileUpload color="#fff" size={30} />
              <input type="file" accept=".pdf" placeholder="Enviar arquivo" />
            </label>

            <button>Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}
