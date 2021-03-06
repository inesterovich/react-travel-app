import React from "react";
import styles from "./styles.module.css";
import { NativeSelect } from "@material-ui/core";

const Language: React.FC = () => {
  return (
    <div className={styles.language}>
      <NativeSelect id="select" disableUnderline={true}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
        <option value="es">ES</option>
      </NativeSelect>
    </div>
  );
};

export default Language;
