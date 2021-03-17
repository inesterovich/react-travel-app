const apikeyWeather = "182866b20b6447b388591830202105";
const apikeyCurrency = "06d6831204e1450b40012dc2";
export const fetchWeather = async (city: String) => {
  try {
    const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${apikeyWeather}&q=${city}&days=1`;

    const responseWeather = await fetch(urlWeather);
    const data = await responseWeather.json();

    const dataIcon = await data.current.condition.icon;
    const dataText = await data.current.condition.text;
    const dataTemp = await data.current.temp_c;
    const dataHumidity = await data.current.humidity;

    const dataWeather = {
      dataHumidity: dataHumidity,
      dataIcon: dataIcon,
      dataTemp: dataTemp,
      dataText: dataText,
    };

    return dataWeather;
  } catch (e) {
    console.error("Weather ERROR = ", e);
    return e;
  }
};

export const fetchCurrency = async (base: String) => {
  try {
    const urlCurrency = ` https://v6.exchangerate-api.com/v6/${apikeyCurrency}/latest/${base}`;
    const responseCurrency = await fetch(urlCurrency);
    const data = await responseCurrency.json();
    const dataCurrency = {
      ratesUSD: data.conversion_rates.USD,
      ratesEUR: data.conversion_rates.EUR,
      ratesRUB: data.conversion_rates.RUB,
    };
    return dataCurrency;
  } catch (e) {
    console.error("Currency ERROR = ", e);
    return e;
  }
};
