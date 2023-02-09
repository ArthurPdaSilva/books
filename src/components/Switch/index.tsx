import React from "react";
import styles from "./styles.module.scss";

import useTheme from "@/hooks/useTheme";

export default function Switch() {
  const { checked, setChecked } = useTheme();

  const handleCheck = () => {
    localStorage.setItem("@theme", checked ? "light" : "dark");
    setChecked(!checked);
  };

  return (
    <>
      <input
        className={styles.switchInput}
        id="react-switch"
        type="checkbox"
        onChange={handleCheck}
        checked={checked}
      />

      <label htmlFor="react-switch" className={styles.switchLabel}>
        <span className={styles.switchButton} />
      </label>
    </>
  );
}
