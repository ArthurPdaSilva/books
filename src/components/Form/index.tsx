import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface FormProps {
  typeForm: string;
  buttonText: string;
  children: ReactNode;
}

export default function Form({ typeForm, buttonText, children }: FormProps) {
  return (
    <div className={styles.container}>
      <h1>{typeForm}</h1>

      <form className={styles.form}>
        {typeForm === "Cadastro" && (
          <input type="text" placeholder="Nome do usuário" required />
        )}

        <input type="email" placeholder="email@gmail.com" required />
        <input type="password" placeholder="******" required />

        {typeForm === "Login" && (
          <div className={styles.checkContainer}>
            <input type="checkbox" id="check" />
            <label htmlFor="check"></label>
            <label htmlFor="check">Lembrar de mim</label>
          </div>
        )}

        <button type="submit">{buttonText}</button>
      </form>

      {children}
    </div>
  );
}
