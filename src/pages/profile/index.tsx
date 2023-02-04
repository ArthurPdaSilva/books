import Sidebar from "@/components/Sidebar";
import Switch from "@/components/Switch";
import Head from "next/head";
import { useState } from "react";
import { MdAccountCircle, MdOutlineFileUpload } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Profile() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Head>
        <title>Books - Editar perfil</title>
      </Head>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <h1>Perfil</h1>

          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <MdOutlineFileUpload color="#fff" size={30} />
              </span>
              <input type="file" accept="image/*" />
              <MdAccountCircle size={220} />
            </label>

            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />

            <label>
              Dark Mode:
              <Switch
                isOn={checked}
                handleToggle={() => setChecked(!checked)}
              />
            </label>

            <button type="submit" className={styles.buttonProfile}>
              Salvar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
