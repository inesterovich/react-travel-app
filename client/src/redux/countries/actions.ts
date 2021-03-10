export const actionCountriesRequest = () =>
  ({ type: "countries/REQUEST" } as const);

export const actionCountriesSuccess = (data: Array<Object>) =>
  ({ type: "countries/SUCCESS", payload: { data } } as const);

export const actionCountriesFailure = (error: string) =>
  ({ type: "countries/SET_FAILURE", payload: { error } } as const);
export const actionSetCurrentLanguage = (lang: string) =>
  ({ type: "countries/SET_LANGUAGE", payload: {lang} } as const)
