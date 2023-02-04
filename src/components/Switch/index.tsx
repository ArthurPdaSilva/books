import React from "react";
import styles from "./styles.module.scss";

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

export default function Switch({ isOn, handleToggle }: SwitchProps) {
  return (
    <>
      <input
        className={styles.switchInput}
        id="react-switch"
        type="checkbox"
        onChange={handleToggle}
      />

      <label htmlFor="react-switch" className={styles.switchLabel}>
        <span className={styles.switchButton} />
      </label>
    </>
  );
}
