// import { actionLoginFailed } from "./../auth/actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import { actionRegister } from "./actions";
import { serverLogin, serverRegister } from "../api";
import { actionLoginFailed } from "../auth";
import { actionLoginSuccess } from "../auth/actions";

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

  if (isRegister && isRegister?.statusText) {
    const isLogin = await serverLogin({
      email,
      password,
    });

    const { token, userId, avatar, name } = isLogin?.data;
    dispatch(actionLoginSuccess(token, userId, avatar, name));
  } else {
    dispatch(actionLoginFailed(isRegister.response.data.message));
  }
};
