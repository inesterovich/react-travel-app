// import { ICountry } from "../types";
import axios from "axios";

export const getCountriesRequest = async () => {
  try {
    const { data } = await axios.post("/api/service/countries");
    console.log(data);
    return data.splice(0, 10);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};

const BASE_API_URL = `https://loft-taxi.glitch.me`;

export const serverLogin = async (payload: any) => {
  try {
    return await axios.post(`${BASE_API_URL}/auth`, payload);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};

export const serverRegister = async (payload: any) => {
  const { name, email, password } = payload;
  const tempData = {
    name: name,
    email: email,
    password: password,
    surname: "a",
  };
  try {
    // const headers = {
    //   "Content-Type": "multipart/form-data",
    // };
    // return await axios.post(`${BASE_API_URL}/register`, payload, {
    //   headers: headers,
    // });
    return await axios.post(`${BASE_API_URL}/register`, tempData);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};
