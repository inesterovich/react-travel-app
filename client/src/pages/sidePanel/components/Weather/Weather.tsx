import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../services";
import styles from "./styles.module.css";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { CurrentCountry } from "../../../../types";

enum lang {
  "ru" = "ru",
  "en" = "en",
  "es" = "es",
}

const dataLang = {
  [lang.ru]: "влажность",
  [lang.en]: "humidity",
  [lang.es]: "humedad",
};

type WeatherDescription = {
  [key in lang]?: string;
};

const textWeatherHeader: WeatherDescription = {
  [lang.ru]: "Погода в столице",
  [lang.en]: "Weather in the capital",
  [lang.es]: "Clima en la capital",
};

interface CurrentWeather {
  dataHumidity: number;
  dataIcon: string;
  dataTemp: number;
  dataText: string;
}

type State = {
  countries: {
    currentCountry: CurrentCountry;
    currentLanguage: string;
    name: string;
  };
};

const Weather: React.FC = React.memo(() => {
  const [weatherData, setWeatherDate] = useState<CurrentWeather | null>(null);
  const currentLanguage = useSelector(
    (state: State) => state.countries.currentLanguage
  );

  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry || [];
  });

  useEffect(() => {
    const getDataWeather = async () => {
      const data = await fetchWeather("Moskau");
      setWeatherDate(data);
    };
    getDataWeather();
  }, []);

  return (
    <div className={styles.weather}>
      {weatherData && (
        <>
          <Typography variant="h5" gutterBottom>
            {textWeatherHeader[currentLanguage as lang]}:
          </Typography>
          <div className={styles.containerTempIconText}>
            <div className={styles.weatherTemp}>
              {Math.round(weatherData.dataTemp)}&deg;C
            </div>
            <div className={styles.containerIconText}>
              <div>
                <img
                  alt="weatherIcon"
                  src={weatherData.dataIcon}
                  className={styles.weatherIcon}
                />
              </div>
              <div className={styles.weatherText}>{weatherData.dataText}</div>
            </div>
          </div>

          <div className={styles.weatherHumidity}>
            {dataLang[currentLanguage as lang]} {weatherData.dataHumidity}%
          </div>
        </>
      )}
    </div>
  );
});
export default Weather;
