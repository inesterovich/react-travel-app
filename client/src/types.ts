export type Action = {
  type: string;
  payload: any;
};
export type Person = {
  login: string;
  email: string;
  password: string;
};

import * as CountriesActions from "./redux/countries/actions";

export interface ICountry {
  name: string;
  snippet: string;
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

// Определить тип
export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypes = ReturnType<InferValueTypes<typeof CountriesActions>>;

// Импортируем action creators как actions,
// берем их ReturnType (тип возвращаемого значения — экшен),
// и собираем при помощи нашего специального типа. Получается как раз то, что требовалось.
