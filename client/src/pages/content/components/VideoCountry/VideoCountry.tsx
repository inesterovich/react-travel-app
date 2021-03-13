import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { CurrentCountry, CurrentCountryLang } from "../../../../types";

enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

type VideoDescription = {
  [key in Lang]?: string;
};

const textVideoData: VideoDescription = {
  [Lang.Ru]: "Видео о стране",
  [Lang.En]: "Country video",
  [Lang.Es]: "Video del país",
};

type State = {
  countries: {
    currentCountry: CurrentCountry;
    currentLanguage: string;
    name: string;
  };
};

const VideoCountry: React.FC = React.memo(() => {
  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry || [];
  });

  const [
    countryLangData,
    setCountryLangData,
  ] = useState<CurrentCountryLang | null>(null);

  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    setCountryLangData(currentCountry[currentLanguage as Lang]);
  }, [currentCountry, currentLanguage]);

  useEffect(() => {
    if (countryLangData?.video) {
      const re = /watch/gi;
      const newLink = countryLangData?.video.replace(re, "embed");
      setVideoLink(newLink);
    }
  }, [countryLangData?.video]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {textVideoData[currentLanguage as Lang]}
      </Typography>
      {countryLangData?.video && (
        <iframe
          width="100%"
          height="400"
          src={videoLink}
          title={countryLangData?.name}
          // @ts-ignore
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
});
export default VideoCountry;
