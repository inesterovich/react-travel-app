import { ICountry } from "../types";
import axios from "axios";

export interface ICountriesTransform {
  name: string;
  snippet: string;
}

const _transformCountries = ({
  name,
  snippet,
}: ICountry): ICountriesTransform => {
  return {
    name: name,
    snippet: snippet,
  };
};

export const getCountriesRequest = async () => {
  try {
    const { data } = await axios.post("/api/service/countries");

    return data.splice(0, 10).map(_transformCountries);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};
