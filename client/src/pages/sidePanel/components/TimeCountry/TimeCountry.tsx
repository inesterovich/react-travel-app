import React, { useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import styles from "./styles.module.css";
import { useState } from "react";
import { Typography } from "@material-ui/core";

const days = [
  {
    ru: "Воскресенье",
    es: "Domingo",
  },
  {
    ru: "Понедельник",
    es: "Lunes",
  },
  {
    ru: "Вторник",
    es: "Martes",
  },
  {
    ru: "Среда",
    es: "Miércoles",
  },
  {
    ru: "Четверг",
    es: "Jueves",
  },
  {
    ru: "Пятница",
    es: "Viernes",
  },
  {
    ru: "Суббота",
    es: "Sábado",
  },
];

const mounths = [
  {
    ru: "январь",
    es: "enero",
  },
  {
    ru: "февраль",
    es: "febrero",
  },
  {
    ru: "март",
    es: "marzo",
  },
  {
    ru: "апрель",
    es: "abril",
  },
  {
    ru: "май",
    es: "mayo",
  },
  {
    ru: "июнь",
    es: "junio",
  },
  {
    ru: "июль",
    es: "julio",
  },
  {
    ru: "август",
    es: "agosto",
  },
  {
    ru: "сентябрь",
    es: "septiembre",
  },
  {
    ru: "октябрь",
    es: "octubre",
  },
  {
    ru: "ноябрь",
    es: "noviembre",
  },
  {
    ru: "декабрь",
    es: "diciembre",
  },
];

enum Lang {
  Ru = "ru",
  Es = "es",
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

const getWeekDay = (date: DayIndex, language: Lang) => {
  return days[date][language];
};
const getMounth = (date: MounthIndex, language: Lang) => {
  return mounths[date];
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
  const timezone = "Europe/Minsk";
  const lang = "en";
  const [currentTime, setCurrentTime] = useState<string | undefined>("");

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentTime(startTime(lang, timezone));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [lang, timezone]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Дата и время:
      </Typography>
      <div className={styles.timeCountry}>
        <h3 className={styles.time}> {`${currentTime}`}</h3>
      </div>
    </>
  );
});
export default TimeCountry;
