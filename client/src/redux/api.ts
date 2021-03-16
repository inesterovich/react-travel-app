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

// api/auth/login со следующими данными:
// email - dev@dev.ru
// password - password

// Формат - либо x-www-formurlencoded, либо content-type: application/json также должно сработать
// Вот валидный токен - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDRlZjk2YjQwNjk5ODQxNTg0MDI5N2IiLCJpYXQiOjE2MTU3ODg2OTEsImV4cCI6MTYxNjk5ODI5MX0.ComhKxLpiyQcfg0Tu1G6t1jaYE5xE06O6tksGXZJFCc

// Готова авторизация на стороне сервера;
// Для регистрации используется роут /api/auth/register, настроена простая валидация - поле должно быть хотя бы похоже на email, а пароль не может быть короче 6 символов;
// Для авторизации используется роут /api/auth/login, проверка валидации на незаполненные поля. В ответ клиент получает Bearer токен, id юзера и линк на аватарку (годится для вставки в src)
// Настроена частичная защита роута /api/service/countries: без авторизации сервер пришлёт всё, кроме рейтинга (пока что там пустой массив). С авторизацией высылаются данные вместе с рейтингом;
// Для отправки запроса с авторизацией требуется прописать дополнительный header:
// Authorization: Bearer ${token}
// Пробел обязателен - именно по нему сервер понимает, где начинается сам токен.
// Id юзера можно не передавать - в самом токене уже "зашит" нужный id.

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
