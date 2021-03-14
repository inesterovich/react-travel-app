export const actionCountriesRequest = () =>
  ({ type: "countries/REQUEST" } as const);

export const actionCountriesSuccess = (data: Array<Object>) =>
  ({ type: "countries/SUCCESS", payload: { data } } as const);

export const actionCountriesFailure = (error: string) =>
  ({ type: "countries/SET_FAILURE", payload: { error } } as const);
export const actionSetCurrentLanguage = (lang: string) =>
  ({ type: "countries/SET_LANGUAGE", payload: { lang } } as const);
export const actionSetCurrentCountry = (dataCountry: any) =>
  ({ type: "countries/SET_COUNTRY", payload: { dataCountry } } as const);
export const actionSetSearch = (search: string) =>
  ({ type: "countries/SET_SEARCH", payload: { search } } as const);
export const actionSetLoaderWeather = (isLoaderWeather: boolean) =>
  ({
    type: "countries/SET_LOADER_WEATHER",
    payload: { isLoaderWeather },
  } as const);
export const actionSetLoaderCurrency = (isLoaderCurrency: boolean) =>
  ({
    type: "countries/SET_LOADER_CURRENCY",
    payload: { isLoaderCurrency },
  } as const);
