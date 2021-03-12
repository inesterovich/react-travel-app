import * as CountriesActions from "./redux/countries/actions";

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypes = ReturnType<InferValueTypes<typeof CountriesActions>>;

export type CountryType = {
  name: string;
  image?: {
    caption: string;
    url: string;
  };
  snippet?: string;
  description?: string;
  capital?: {
    coordinates: Array<number>
    name:string
  }
}

export type ICountry = {
  [key: string] : CountryType
};

export type CurrentCountry = {
  attractions?: {
    description: string;
    image?: {
      url: string;
      caption: string;
    };
    name: string;
    snippet: string;
    _id: string;
  }[];
  currency: {
    code: string;
  };
  image: { url: string; caption: string };
  name?: string;
  properties: {
    name: string;
    value: string;
  }[];
  snippet?: string;
  description?: string;
};
