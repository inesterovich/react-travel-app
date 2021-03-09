import { ICountry } from "../types";
import axios from "axios";

export interface ICountriesTransform {
  name: string;
  capital: string;
}

const _transformCountries = ({
  name,
  capital,
}: ICountry): ICountriesTransform => {
  return {
    name: name,
    capital: capital,
  };
};

export const getCountriesRequest = async () => {
  try {
    const { data } = await axios.post("/api/service/country");

    // const { data } = await axios.get(
    //   "api/service/countries"
    // );

    // axios
    //   .post("/api/service/country", { name: "Russia" })
    //   .then(function (response) {
    //     console.log("Resp = ", response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // useEffect(() => {
    //   fetch("/api/service/country", {
    //     method: "POST",
    //     body: JSON.stringify({ name: "Russia" }),
    //     headers: { "Content-type": "application/json;charset=UTF-8" },
    //   })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json))
    //     .catch((err) => console.log(err));
    // }, []);
    // console.log(data.splice(0, 10).map(_transformCountries));
    return data.splice(0, 10).map(_transformCountries);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};
