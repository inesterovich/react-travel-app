// import { ICountry } from "../types";
import axios from "axios";

export const getCountriesRequest = async () => {
  try {
    const { data } = await axios.post("/api/service/countries");
    return data.splice(0, 10);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};
