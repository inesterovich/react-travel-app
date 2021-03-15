import { actionLoginFailed, actionLoginSuccess } from "./../auth/actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { actionRegister } from "./actions";
import { serverRegister } from "../api";

export const serverRegisterThunk = ({
  name,
  email,
  password,
  avatar,
}: any): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(actionRegister(name, email, password, avatar));

  const isRegister = await serverRegister({
    email,
    password,
    name,
    avatar,
  });
  console.log("isRegister = ", isRegister?.data);
  if (isRegister?.data.success) {
    dispatch(actionLoginSuccess(isRegister?.data.token));
  } else {
    dispatch(actionLoginFailed(isRegister?.data.error));
  }
  // try {
  //   const register = yield call(serverRegister, action.payload);
  //   if (register.success) {
  //     yield put(logIn(register.token, action.payload.email));
  //   } else {
  //     yield put(logInFailed(register.error));
  //   }
  // } catch (e) {
  //   yield put(logInFailed(SERVER_ERROR_MESSAGE));
  // }
};
