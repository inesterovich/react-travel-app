import React from "react";
import Currency from "../components/Currency";
import TimeCountry from "../components/TimeCountry";
import Weather from "../components/Weather";
import styles from "./styles.module.css";

const SidePanel: React.FC = React.memo(() => {
  return (
    <div className={styles.sidePanel}>
      <div className="widget">
        <Weather />
      </div>
      <div className="widget">
        <Currency />
      </div>
      <div className="widget">
        <TimeCountry />
      </div>
    </div>
  );
});
export default SidePanel;
