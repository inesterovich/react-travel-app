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

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDRlZjk2YjQwNjk5ODQxNTg0MDI5N2IiLCJpYXQiOjE2MTU3ODg2OTEsImV4cCI6MTYxNjk5ODI5MX0.ComhKxLpiyQcfg0Tu1G6t1jaYE5xE06O6tksGXZJFCc";

export const getAuthCountriesRequest = async () => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  try {
    const { data } = await axios.post("/api/service/countries", null, config);
    console.log("RATING = ", data);
    // console.log("RATING FILTERED = ", data.filter((el)=>el.));
    return data.splice(0, 10);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }

  // axios
  //   .post("/api/service/countries", null, config)
  //   .then((res) => {
  //     console.log("RATING = ", res.data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};

export const serverLogin = async (payload: any) => {
  try {
    return await axios.post(`/api/auth/login`, payload);
  } catch (err) {
    return await err;
  }
};

export const serverRegister = async (payload: any) => {
  try {
    const { avatar, email, name, password } = payload;
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("avatar", avatar[0]);

    return await axios.post("/api/auth/register", data);
  } catch (err) {
    return await err;
  }
};
