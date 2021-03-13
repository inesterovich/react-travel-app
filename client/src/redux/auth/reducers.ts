import { ActionTypesAuth } from "../../types";

const initialState = {
  isLoggedIn: false as boolean,
  token: null as string | null,
  error: null as string | null,
};

type InitialStateType = typeof initialState;

// eslint-disable-next-line
const auth = (
  state: InitialStateType = initialState,
  action: ActionTypesAuth
): InitialStateType => {
  switch (action.type) {
    case "auth/LOG_IN": {
      return { ...state, isLoggedIn: true, token: action.payload.token };
    }
    case "auth/LOG_OUT": {
      return { ...state, isLoggedIn: false, token: null, error: null };
    }
    case "auth/AUTHENTICATE": {
      return { ...state };
    }
    case "auth/LOG_IN_FAILED": {
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default auth;
