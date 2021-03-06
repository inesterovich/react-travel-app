import React from "react";
import styles from "./styles.module.css";

import { Fade, Grid } from "@material-ui/core";
import CountryCard from "../../views/components/CountryCard/index";

const MainPage: React.FC = () => {
  return (
    <div className={styles.mainPage}>
      <Fade in={true} timeout={700}>
        <Grid container spacing={4}>
          {Array(12)
            .fill(null)
            .map(() => (
              <Grid item xl={3} md={4} sm={6}>
                <CountryCard />
              </Grid>
            ))}
        </Grid>
      </Fade>
    </div>
  );
};
export default MainPage;
