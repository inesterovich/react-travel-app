import * as CountriesActions from "./redux/countries/actions";
import * as AuthActions from "./redux/auth/actions";
import * as RegisterActions from "./redux/registration/actions";

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type ActionTypes = ReturnType<InferValueTypes<typeof CountriesActions>>;
export type ActionTypesAuth = ReturnType<InferValueTypes<typeof AuthActions>>;
export type ActionTypesRegister = ReturnType<
  InferValueTypes<typeof RegisterActions>
>;

export type CountryType = {
  name: string;
  image?: {
    caption: string;
    url: string;
  };
  snippet?: string;
  description?: string;
  capital?: {
    coordinates: Array<number>;
    name: string;
  };
};

export type ICountry = {
  [key: string]: CountryType;
};

enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

export type CurrentCountryLang = {
  attractions?: {
    name: string;
    url: string;
    _id: string;
  }[];

  capital?: {
    name: string;
  };

  code: string;

  currency: {
    code: string;
    name: string;
    symbol: string;
  };

  description?: string;

  flag?: String;

  image: {
    caption: string;
    url: string;
  };

  name: string;

  snippet: string;

  video: string;

  _id: string;
};

export type CurrentCountry = {
  [Lang.En]: CurrentCountryLang;

  [Lang.Ru]: CurrentCountryLang;

  [Lang.Es]: CurrentCountryLang;
};
