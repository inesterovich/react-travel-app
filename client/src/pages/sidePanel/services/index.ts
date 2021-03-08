const apikeyWeather = "182866b20b6447b388591830202105";

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
    return e;
  }
};
