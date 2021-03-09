import React, { useEffect, useState } from "react";
import { fetchCurrency } from "../../services";
import styles from "./styles.module.css";

const textCurrencyData = {
  ru: "Валюта страны",
  en: "Country currency",
  es: "Moneda del país",
};

const valueCurrencyData = {
  Russia: "RUB",
  "Dominican Republic": "DOP",
  Thailand: "THB",
  Maldives: "MVR",
  USA: "USD",
  China: "CNY",
  "United Kingdom": "GBP",
  Italy: "EUR",
  Spain: "EUR",
  France: "EUR",
};

interface CurrentCurrency {
  ratesUSD: string;
  ratesEUR: string;
  ratesRUB: string;
}

const Currency: React.FC = React.memo(() => {
  const [currencyData, setCurrencyData] = useState<CurrentCurrency | null>(
    null
  );
  const lang = "en";
  const country = "Russia";

  useEffect(() => {
    const getDataCurrency = async () => {
      const data = await fetchCurrency(valueCurrencyData[country]);
      setCurrencyData(data);
    };
    getDataCurrency();
  }, []);

  return (
    <div className={styles.currency}>
      {currencyData && (
        <>
          <p className={styles.nameCurrency}>
            {textCurrencyData[lang]}: {valueCurrencyData[country]}
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
