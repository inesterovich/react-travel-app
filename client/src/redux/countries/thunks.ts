import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { actionCountriesSuccess, actionCountriesRequest } from "./actions";
import { getCountriesRequest } from "../api";

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
