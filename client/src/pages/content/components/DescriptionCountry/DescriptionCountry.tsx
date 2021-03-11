import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import ApartmentIcon from "@material-ui/icons/Apartment";
import VideoCountry from "../VideoCountry";
import { CurrentCountry } from "../../../../types";

type State = {
  countries: {
    currentCountry: CurrentCountry;
    description: string;
    name: string;
    image: { url: string };
  };
};

const DescriptionCountry: React.FC = React.memo(() => {
  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry || [];
  });

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={5}>
          <div className="counryPage__wrap">
            <img
              src={currentCountry.image.url}
              alt=""
              className="counryPage__img"
            />
          </div>
        </Grid>
        <Grid item md={7}>
          <section className="section">
            <div className="meta">
              <Typography variant="h1" gutterBottom>
                {currentCountry.name}
              </Typography>
              <div className="meta__city">
                Столица <ApartmentIcon></ApartmentIcon>
              </div>
            </div>
            <Typography variant="body1" gutterBottom>
              <>
                <p>{currentCountry.description}</p>
                <p>
                  {currentCountry.properties[0].name}:{" "}
                  {currentCountry.properties[0].value}
                </p>
                {/* <p>
                  {currentCountry.properties[1].name}:{" "}
                  {currentCountry.properties[0].value} m2
                </p> */}
              </>
            </Typography>
          </section>
          <section className="section mb_0">
            <VideoCountry />
          </section>
        </Grid>
      </Grid>
    </>
  );
});
export default DescriptionCountry;
