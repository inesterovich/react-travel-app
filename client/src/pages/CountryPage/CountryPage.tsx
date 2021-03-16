import React from "react";
import SidePanel from "../sidePanel/SidePanel";
import styles from "./styles.module.css";
import { Fade, Grid, Typography } from "@material-ui/core";
import MapCountry from "../content/components/MapCountry";
import DescriptionCountry from "../content/components/DescriptionCountry";
import PhotoGallery from "../content/components/PhotoGallery";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import VideoCountry from "../content/components/VideoCountry";

enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

type textDescription = {
  [key in Lang]?: string;
};

const textHeaderPhotogallery: textDescription = {
  [Lang.Ru]: "Достопримечательности",
  [Lang.En]: "Sights",
  [Lang.Es]: "Monumentos",
};

const textHeaderMap: textDescription = {
  [Lang.Ru]: "Карта страны",
  [Lang.En]: "Country map",
  [Lang.Es]: "Mapa del país",
};

const CountryPage: React.FC = React.memo(() => {
  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );
  return (
    <>
      <Fade in={true} timeout={1200}>
        <div className={styles.counryPage}>
          <Grid container spacing={4}>
            <Grid item xl={9} md={8} xs={12}>
              <section className="section">
                <DescriptionCountry />
              </section>
              <section className="section">
                <Typography variant="h4" gutterBottom>
                  {textHeaderPhotogallery[currentLanguage as Lang]}
                </Typography>
                <PhotoGallery />
              </section>
            </Grid>
            <Grid item xl={3} md={4} xs={12}>
              <SidePanel />
              <section className="section">
                <VideoCountry />
              </section>
            </Grid>
          </Grid>
          <Typography variant="h4" component="h4" gutterBottom>
            {textHeaderMap[currentLanguage as Lang]}
          </Typography>
          <MapCountry />
        </div>
      </Fade>
    </>
  );
});
export default CountryPage;
