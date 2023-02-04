import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import Router from "next/router";

export default function Error() {
  useEffect(() => {
    setTimeout(() => {
      Router.push("/");
    }, 5000);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerError}>
        <h1>[404] : (</h1>
        <p>Página não encontrada!</p>
        <p>Voltando para a tela inicial...</p>
        <FiRefreshCcw size={25} color="black" />
      </div>
    </div>
  );
}
