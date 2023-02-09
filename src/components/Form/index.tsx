import React, { useState, useCallback, ReactNode } from "react";
import styles from "./styles.module.scss";

import useAuth from "@/hooks/useAuth";

interface FormProps {
  typeForm: string;
  buttonText: string;
  children: ReactNode;
}

export default function Form({ typeForm, buttonText, children }: FormProps) {
  const { signUp, signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signUp({ name, email, password });
    },
    [email, name, password, signUp]
  );

  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signIn({ email, password });
    },
    [email, password, signIn]
  );

  return (
    <div className={styles.container}>
      <h1>{typeForm}</h1>

      <form
        className={styles.form}
        onSubmit={typeForm === "Cadastro" ? handleRegister : handleLogin}
      >
        {typeForm === "Cadastro" && (
          <input
            type="text"
            placeholder="Nome do usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={5}
            required
          />
        )}

        <input
          type="email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        <button type="submit">{buttonText}</button>
      </form>

      {children}
    </div>
  );
}
