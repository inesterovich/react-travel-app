import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../services";
import styles from "./styles.module.css";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CurrentCountry } from "../../../../types";
import { textWeatherData } from "./helper";
import { RootState } from "../../../../redux/rootReducer";
import { actionSetLoaderWeather } from "../../../../redux/countries";
import { CircularProgress } from "@material-ui/core";
enum lang {
  "ru" = "ru",
  "en" = "en",
  "es" = "es",
}

enum NameWeather {
  mist = "Mist",
  sunny = "Sunny",
  pc = "Partly cloudy",
  clear = "Clear",
  mc = "Mostly Cloudy",
  showers = "Showers",
  cloudy = "Cloudy",
  ms = "Mostly Sunny",
  rain = "Rain",
  snow = "Snow",
  overcast = "Overcast",
  th = "Thunderstorm",
  drizzle = "Drizzle",
  prp = "Patchy rain possible",
  lr = "Light rain",
  thailand = "Light snow",
  hr = "Heavy rain",
  cw = "Changeable weather",
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
    capital?: {
      name?: string;
    };
  };
};

const Weather: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [weatherDataText, setWeatherDataText] = useState("Changeable weather");
  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const currentCapital = useSelector((state: State) => {
    if (
      state.countries.currentCountry.en.capital?.name === "Washington, D.C."
    ) {
      return "Washington";
    }
    return state.countries.currentCountry.en.capital?.name || "";
  });
  const isLoaderWeather = useSelector(
    (state: RootState) => state.countries.isLoaderWeather
  );

  useEffect(() => {
    const getDataWeather = async () => {
      dispatch(actionSetLoaderWeather(true));
      const data = await fetchWeather(currentCapital);
      dispatch(actionSetLoaderWeather(false));
      setWeatherData(data);
    };
    getDataWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!textWeatherData[weatherData?.dataText as NameWeather])
      setWeatherDataText("Changeable weather");
    else setWeatherDataText(weatherData?.dataText as NameWeather);
  }, [weatherData]);

  return (
    <div className={styles.weather}>
      {isLoaderWeather ? (
        <CircularProgress />
      ) : (
        <>
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
                  {weatherData && (
                    <div className={styles.weatherText}>
                      {
                        textWeatherData[weatherDataText as NameWeather][
                          currentLanguage as lang
                        ]
                      }
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.weatherHumidity}>
                {dataLang[currentLanguage as lang]} {weatherData.dataHumidity}%
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
});
export default Weather;
