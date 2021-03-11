import React from "react";
import SidePanel from "../sidePanel/SidePanel";
import styles from "./styles.module.css";
import { Fade, Grid, Typography } from "@material-ui/core";
import MapCountry from "../content/components/MapCountry";
import DescriptionCountry from "../content/components/DescriptionCountry";
import PhotoGallery from "../content/components/PhotoGallery";

const CountryPage: React.FC = React.memo(() => {
  return (
    <>
      <Fade in={true} timeout={1200}>
        <div className={styles.counryPage}>
          <Grid container spacing={4}>
            <Grid item md={9}>
              <section className="section">
                <DescriptionCountry />
              </section>
            </Grid>
            <Grid item md={3}>
              <SidePanel />
              <section className="section">
                <Typography variant="h4" gutterBottom>
                  Достопримечательности
                </Typography>
                <PhotoGallery />
              </section>
            </Grid>
          </Grid>
          <Typography variant="h4" component="h4" gutterBottom>
            Карта страны
          </Typography>
          <MapCountry />
        </div>
      </Fade>
    </>
  );
});
export default CountryPage;
