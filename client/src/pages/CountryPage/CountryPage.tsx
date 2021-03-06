import React from "react";
import Content from "../content/Content";
import SidePanel from "../sidePanel/SidePanel";
import styles from "./styles.module.css";
import { Fade } from "@material-ui/core";

const CountryPage: React.FC = () => {
  return (
    <>
      <h1>Страница страны содержит:</h1>
      <Fade in={true} timeout={700}>
        <div className={styles.counryPage}>
          <Content />
          <SidePanel />
        </div>
      </Fade>
    </>
  );
};
export default CountryPage;
