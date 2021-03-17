import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDRlZjk2YjQwNjk5ODQxNTg0MDI5N2IiLCJpYXQiOjE2MTU3ODg2OTEsImV4cCI6MTYxNjk5ODI5MX0.ComhKxLpiyQcfg0Tu1G6t1jaYE5xE06O6tksGXZJFCc";

export const getCountriesRequest = async () => {
  try {
    const { data } = await axios.post("/api/service/countries");
    return data.splice(0, 10);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
};

export const getAuthCountriesRequest = async () => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  try {
    const { data } = await axios.post("/api/service/countries", null, config);
    return data.splice(0, 10);
  } catch (err) {
    console.error("ERROR IN API = ", err);
  }
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

// Для голосования надо отправить запрос на /api/service/vote. Роут ждёт json, в заголовке прописываем токен (без него вернёт 401 ошибку), тело запроса выглядит так:
// countryId: country._id (самый верхний параметр, не внутри языков!!!),
// attractionId: attraction._id (конкретного языка),
// lang: langCode (текущий выбранный язык пользователя),
// value: Number (range не настраивал, к числу привести попытается, но если получится "NaN", может быть плохо
// }

// В ответ сервер возвращает обновленную СТРАНУ целиком - на всех языках.
// Поле рейтинг у конкретной достопримечательности - массив объектов (бывает пустым).
// В каждом объекте рейтинга есть value, userId, и ссылка на аватарку.

// ПРИМЕЧАНИЕ: "переголосовать" роут позволяет, ошибку не выкинет. Однако обновление аватарки (если вдруг "когда-нибудь появится") он не увидит: линк прописывается в базу жестко, находить всех юзеров "на лету" не получилось.

export const setVoices = async (/* payload: any */) => {
  try {
    // const { avatar, email, name, password } = payload;

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const data = new FormData();
    // data.append("countryId", "0");
    // data.append("attractionId", "0");
    // data.append("lang", "ru");
    // data.append("value", "5");

    return await axios.post("/api/service/vote", data, config);
  } catch (err) {
    return await err;
  }
};
