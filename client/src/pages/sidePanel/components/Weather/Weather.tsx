import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../services";
import styles from "./styles.module.css";
import { Typography } from "@material-ui/core";

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

interface CurrentWeather {
  dataHumidity: number;
  dataIcon: string;
  dataTemp: number;
  dataText: string;
}

const Weather: React.FC = React.memo(() => {
  const [weatherData, setWeatherDate] = useState<CurrentWeather | null>(null);
  const [lang, setLang] = useState<string>("en");
  useEffect(() => {
    const getDataWeather = async () => {
      const data = await fetchWeather("Moskau");
      setWeatherDate(data);
    };
    getDataWeather();
  }, []);

  useEffect(() => {
    setLang("en");
  }, []);

  return (
    <div className={styles.weather}>
      {weatherData && (
        <>
          <Typography variant="h5" gutterBottom>
            Погода в столице:
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
            {dataLang[lang as lang]} {weatherData.dataHumidity}%
          </div>
        </>
      )}
    </div>
  );
});
export default Weather;
