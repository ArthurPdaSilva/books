import useTheme from "@/hooks/useTheme";
import React, { useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Carrosel() {
  const { checked } = useTheme();
  const carroselRef = useRef<HTMLDivElement>(null);

  const handleLeftClick = () => {
    if (carroselRef.current) {
      carroselRef.current.scrollLeft -= carroselRef.current.offsetWidth;
    }
  };

  const handleRightClick = () => {
    if (carroselRef.current) {
      carroselRef.current.scrollLeft += carroselRef.current.offsetWidth;
    }
  };

  return (
    <div className={styles.carrosel} ref={carroselRef}>
      <div className={styles.rectangle}>1</div>
      <div className={styles.rectangle}>2</div>
      <div className={styles.rectangle}>3</div>
      <div className={styles.rectangle}>4</div>
      <div className={styles.rectangle}>5</div>
      <div className={styles.rectangle}>6</div>
      <div className={styles.rectangle}>7</div>
      <div className={styles.rectangle}>8</div>
      <div className={styles.rectangle}>9</div>

      <div className={styles.buttons}>
        <button onClick={handleLeftClick}>
          <MdKeyboardArrowLeft size={68} color={checked ? "#fff" : "#000"} />
        </button>
        <button onClick={handleRightClick}>
          <MdKeyboardArrowRight size={68} color={checked ? "#fff" : "#000"} />
        </button>
      </div>
    </div>
  );
}
