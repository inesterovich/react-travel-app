import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
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
      <Typography variant="h1" gutterBottom>
        {countryLangData?.name}
      </Typography>
      <div className="capital">
        {capitalData[currentLanguage as Lang]}: {countryLangData?.capital?.name}
      </div>
      <img
        src={countryLangData?.image?.url}
        alt={countryLangData?.image?.caption}
        aria-hidden
        className="counryPage__img"
      />
      <Typography variant="body1" gutterBottom>
        {countryLangData?.description}
      </Typography>
    </>
  );
});
export default DescriptionCountry;
