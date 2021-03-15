import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import ApartmentIcon from "@material-ui/icons/Apartment";
import VideoCountry from "../VideoCountry";
import { CurrentCountry, CurrentCountryLang } from "../../../../types";
import { RootState } from "../../../../redux/rootReducer";

type State = {
  countries: {
    currentCountry: CurrentCountry;
    description: string;
    name: string;
    image: { url: string };
  };
};
enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

type CapitalDescription = {
  [key in Lang]?: string;
};

const capitalData: CapitalDescription = {
  [Lang.Ru]: "Столица",
  [Lang.En]: "Capital",
  [Lang.Es]: "Capital",
};

const DescriptionCountry: React.FC = React.memo(() => {
  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry || [];
  });

  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const [
    countryLangData,
    setCountryLangData,
  ] = useState<CurrentCountryLang | null>(null);

  useEffect(() => {
    setCountryLangData(currentCountry[currentLanguage as Lang]);
  }, [currentCountry, currentLanguage]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={5}>
          <div className="counryPage__wrap">
            <img
              src="https://images03.nicepage.io/a1389d7bc73adea1e1c1fb7e/2dafdd6ed7d25c1097f9d794/pexels-photo-5893858.jpeg"
              alt=""
              className="counryPage__img"
            />
          </div>
        </Grid>
        <Grid item md={7}>
          <section className="section">
            <div className="meta">
              <Typography variant="h1" gutterBottom>
                {countryLangData?.name}
              </Typography>
              <div className="capital">
                {capitalData[currentLanguage as Lang]}:{" "}
                {countryLangData?.capital?.name}
              </div>
            </div>
            <Typography variant="body1" gutterBottom>
              <>
                <p>{countryLangData?.description}</p>
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
