import React from "react";
import { useParams } from "react-router-dom";
import Content from "../content/Content";
import SidePanel from "../sidePanel/SidePanel";
import styles from "./styles.module.css";
import {Fade} from "@material-ui/core";

const CountryPage: React.FC = React.memo(() => {
  let params: { id: string } = useParams();
  return (
    <>
      <h1>{params.id}</h1>
      <Fade in={true} timeout={1200}>
        <div className={styles.counryPage}>
          <Content />
          <SidePanel />
        </div>
      </Fade>
    </>
  );
});
export default CountryPage;
