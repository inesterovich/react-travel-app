import * as CountriesActions from "./redux/countries/actions";
import * as AuthActions from "./redux/auth/actions";

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypes = ReturnType<InferValueTypes<typeof CountriesActions>>;
export type ActionTypesAuth = ReturnType<InferValueTypes<typeof AuthActions>>;

export type ICountry = {
  name: string;
  image?: {
    caption: string;
    url: string;
  };
  snippet?: string;
  description?: string;
};
