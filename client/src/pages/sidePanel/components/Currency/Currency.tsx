import React, { useEffect, useState } from "react";
import { fetchCurrency } from "../../services";
import styles from "./styles.module.css";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { CurrentCountry, CurrentCountryLang } from "../../../../types";
import { RootState } from "../../../../redux/rootReducer";

enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

enum ValueLang {
  rub = "RUB",
  dop = "DOP",
  thb = "THB",
  mvr = "MVR",
  usd = "USD",
  cny = "CNY",
  gbr = "GBP",
  eur = "EUR",
}

type CurrencyDescription = {
  [key in Lang]?: string;
};

type CurrencyText = {
  [key in ValueLang]: {
    [key in Lang]: string;
  };
};

const textCurrencyData: CurrencyDescription = {
  [Lang.Ru]: "Валюта страны",
  [Lang.En]: "Country currency",
  [Lang.Es]: "Moneda del país",
};

const headerCurrency: CurrencyDescription = {
  [Lang.Ru]: "Курс валюты",
  [Lang.En]: "Rate",
  [Lang.Es]: "Velocidad",
};

const textValueCurrencyData: CurrencyText = {
  [ValueLang.rub]: {
    [Lang.Ru]: "Рубль",
    [Lang.En]: "Ruble",
    [Lang.Es]: "Rublo",
  },
  [ValueLang.dop]: {
    [Lang.Ru]: "Песо",
    [Lang.En]: "Peso",
    [Lang.Es]: "Peso",
  },
  [ValueLang.thb]: {
    [Lang.Ru]: "Бат",
    [Lang.En]: "Baht",
    [Lang.Es]: "Baht",
  },
  [ValueLang.mvr]: {
    [Lang.Ru]: "Руфия",
    [Lang.En]: "Rufiyaa",
    [Lang.Es]: "Rufia",
  },
  [ValueLang.usd]: {
    [Lang.Ru]: "Доллар",
    [Lang.En]: "Dollar",
    [Lang.Es]: "Dólar",
  },
  [ValueLang.cny]: {
    [Lang.Ru]: "Юань",
    [Lang.En]: "Yuan",
    [Lang.Es]: "Yuan",
  },
  [ValueLang.gbr]: {
    [Lang.Ru]: "Фунт",
    [Lang.En]: "Pound ",
    [Lang.Es]: "Libra",
  },
  [ValueLang.eur]: {
    [Lang.Ru]: "Евро",
    [Lang.En]: "Euro ",
    [Lang.Es]: "Euro",
  },
};

interface CurrentCurrency {
  ratesUSD: string;
  ratesEUR: string;
  ratesRUB: string;
}

type State = {
  countries: {
    currentCountry: CurrentCountry;
    currentLanguage: string;
    name: string;
  };
};

const Currency: React.FC = React.memo(() => {
  const [currencyData, setCurrencyData] = useState<CurrentCurrency | null>(
    null
  );

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

  useEffect(() => {
    const getDataCurrency = async () => {
      if (countryLangData?.currency?.code) {
        const data = await fetchCurrency(countryLangData?.currency?.code);
        setCurrencyData(data);
      }
    };
    getDataCurrency();
  }, [countryLangData?.currency?.code]);

  return (
    <div className={styles.currency}>
      {currencyData && (
        <>
          <Typography variant="h5" gutterBottom>
            {headerCurrency[currentLanguage as Lang]}:
          </Typography>
          <p className={styles.nameCurrency}>
            {textCurrencyData[currentLanguage as Lang]}:{" "}
            {
              textValueCurrencyData[
                countryLangData?.currency?.code as ValueLang
              ][currentLanguage as Lang]
            }{" "}
            {countryLangData?.currency?.symbol}
          </p>
          <p className={styles.valueCurrency}>USD: {currencyData.ratesUSD}</p>
          <p className={styles.valueCurrency}>EUR: {currencyData.ratesEUR}</p>
          <p className={styles.valueCurrency}>RUB: {currencyData.ratesRUB}</p>
        </>
      )}
    </div>
  );
});
export default Currency;
