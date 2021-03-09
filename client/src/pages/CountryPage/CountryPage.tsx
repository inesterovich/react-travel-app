import React from "react";
import Content from "../content/Content";
import SidePanel from "../sidePanel/SidePanel";
import Map from "../../views/components/Map";
import styles from "./styles.module.css";

const CountryPage: React.FC = React.memo(() => {
  return (
    <>
      <h1>Страница страны содержит:</h1>
      <div className={styles.counryPage}>
        <Content />
        <SidePanel />
        <Map />
      </div>
    </>
  );
});
export default CountryPage;
