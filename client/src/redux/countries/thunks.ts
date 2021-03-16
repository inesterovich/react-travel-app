import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { actionCountriesSuccess, actionCountriesRequest } from "./actions";
import { getCountriesRequest, getAuthCountriesRequest } from "../api";

export const getCountriesThunk = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(actionCountriesRequest());
  const countriesList = await getCountriesRequest();
  dispatch(actionCountriesSuccess(countriesList));
};

export const getAuthCountriesThunk = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const countriesList = await getAuthCountriesRequest();
  dispatch(actionCountriesSuccess(countriesList));
};
