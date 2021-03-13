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
    return await axios.post(`${BASE_API_URL}/auth`, JSON.stringify(payload));
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};

// export const serverRegister = async ({ email, password, name, surname }) => {
//   const params = {
//     ...commonParams,
//     body: JSON.stringify({
//       name: name,
//       surname: surname,
//       email: email,
//       password: password,
//     }),
//   };
//   return fetchData(`${BASE_API_URL}/register`, params);
// };
