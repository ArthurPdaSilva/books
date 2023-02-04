import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import Head from "next/head";
import { BsBookHalf, BsFillBookFill } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Publications() {
  return (
    <>
      <Head>
        <title>Books - Criando publicação</title>
      </Head>
      <div className={styles.container}>
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
              Enviar Thumbnail
              <MdOutlineFileUpload color="#fff" size={30} />
              <input type="file" accept="image/*" placeholder="Enviar imagem" />
            </label>
            <label className={styles.labelFile}>
              Enviar Arquivo
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
