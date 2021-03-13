import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import {
  actionLogin,
  // actionLoginFailed,
  // authenticate,
  // actionLogout,
} from "./actions";
import { serverLogin } from "../api";

export const serverLoginThunk = (
  action: any
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(actionLogin(action.payload));
  // const countriesList = await serverLogin();
  // dispatch(actionCountriesSuccess(countriesList));
};
