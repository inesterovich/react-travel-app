import React, { useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import styles from "./styles.module.css";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { CurrentCountry } from "../../../../types";
import { dataTZ, days, mounths } from "./helper";

enum Lang {
  Ru = "ru",
  Es = "es",
}

enum LangHeader {
  Ru = "ru",
  Es = "es",
  En = "en",
}

enum NameCountry {
  china = "China",
  dr = "Dominican Republic",
  france = "France",
  italy = "Italy",
  spain = "Spain",
  usa = "United States",
  maldives = "Maldives",
  russia = "Russia",
  thailand = "Thailand",
  uk = "United Kingdom",
}

enum DayIndex {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
}

enum MounthIndex {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Eleven = 11,
  Twelve = 12,
}

type TimeDescription = {
  [key in LangHeader]?: string;
};

const headerTime: TimeDescription = {
  [LangHeader.Ru]: "Дата и время",
  [LangHeader.En]: "Date and time",
  [LangHeader.Es]: "Fecha y hora",
};

type State = {
  countries: {
    currentCountry: CurrentCountry;
    currentLanguage: string;
    name: string;
  };
};

const getWeekDay = (date: DayIndex, language: Lang) => {
  return days[date][language];
};
const getMounth = (date: MounthIndex, language: Lang) => {
  return mounths[date][language];
};

const startTime = (lang: String, zone: String) => {
  let currentDay, currentMounth, time;
  let date = new Date();
  let day = date.getDay();
  let mounth = date.getMonth();
  if (lang === "en") {
    time = moment().tz(`${zone}`).format("dddd MMMM D, h:mm:ss");
  }
  if (lang === "ru") {
    currentDay = getWeekDay(day, Lang.Ru);
    currentMounth = getMounth(mounth, Lang.Ru);
    time = `${currentDay} ${currentMounth} ${moment()
      .tz(`${zone}`)
      .format("D")}, ${moment().tz(`${zone}`).format("h:mm:ss")}`;
  }
  if (lang === "es") {
    currentDay = getWeekDay(day, Lang.Es);
    currentMounth = getMounth(mounth, Lang.Es);
    time = `${currentDay} ${currentMounth} ${moment()
      .tz(`${zone}`)
      .format("D")}, ${moment().tz(`${zone}`).format("h:mm:ss")}`;
  }
  return time;
};

const TimeCountry: React.FC = React.memo(() => {
  const currentLanguage = useSelector(
    (state: State) => state.countries.currentLanguage
  );
  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry;
  });

  const [currentTime, setCurrentTime] = useState<string | undefined>("");

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentTime(
        startTime(
          currentLanguage,
          dataTZ[currentCountry.en.name as NameCountry]
        )
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [currentLanguage, currentCountry.en.name]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {headerTime[currentLanguage as LangHeader]}:
      </Typography>
      <div className={styles.timeCountry}>
        <h3 className={styles.time}> {`${currentTime}`}</h3>
      </div>
    </>
  );
});
export default TimeCountry;
