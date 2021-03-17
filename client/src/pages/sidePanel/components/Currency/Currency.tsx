import React, { useEffect, useState } from "react";
import { fetchCurrency } from "../../services";
import styles from "./styles.module.css";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CurrentCountry, CurrentCountryLang } from "../../../../types";
import { RootState } from "../../../../redux/rootReducer";
import { actionSetLoaderCurrency } from "../../../../redux/countries";
import { CircularProgress } from "@material-ui/core";

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
  const dispatch = useDispatch();
  const [currencyData, setCurrencyData] = useState<CurrentCurrency | null>(
    null
  );
  const isLoaderCurrency = useSelector(
    (state: RootState) => state.countries.isLoaderCurrency
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
      dispatch(actionSetLoaderCurrency(true));
      if (countryLangData?.currency?.code) {
        const data = await fetchCurrency(countryLangData?.currency?.code);
        setCurrencyData(data);
        dispatch(actionSetLoaderCurrency(false));
      }
    };
    getDataCurrency();
  }, [countryLangData?.currency?.code, dispatch]);

  return (
    <div className={styles.currency}>
      {isLoaderCurrency ? (
        <CircularProgress />
      ) : (
        <>
          {currencyData && (
            <>
              <Typography variant="h5" gutterBottom>
                {headerCurrency[currentLanguage as Lang]}:
              </Typography>
              <p className={styles.nameCurrency}>
                {textCurrencyData[currentLanguage as Lang]}:{" "}
                <strong>
                  {
                    textValueCurrencyData[
                      countryLangData?.currency?.code as ValueLang
                    ][currentLanguage as Lang]
                  }{" "}
                  {countryLangData?.currency?.symbol}
                </strong>
              </p>
              <p className={styles.valueCurrency}>
                USD: <strong> {currencyData.ratesUSD}</strong>
              </p>
              <p className={styles.valueCurrency}>
                EUR: <strong> {currencyData.ratesEUR}</strong>
              </p>
              <p className={styles.valueCurrency}>
                RUB: <strong> {currencyData.ratesRUB}</strong>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
});
export default Currency;
