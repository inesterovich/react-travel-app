import { ActionTypesAuth } from "../../types";

const initialState = {
  isLoggedIn: false as boolean,
  token: null as string | null,
  error: null as string | null,
  userId: null as string | null,
  avatar: undefined as string | undefined,
};

type InitialStateType = typeof initialState;

// eslint-disable-next-line
const auth = (
  state: InitialStateType = initialState,
  action: ActionTypesAuth
): InitialStateType => {
  switch (action.type) {
    case "auth/LOG_IN": {
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        userId: action.payload.userId,
        avatar: action.payload.avatar,
      };
    }
    case "auth/LOG_OUT": {
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        error: null,
        userId: null,
        avatar: undefined,
      };
    }
    case "auth/AUTHENTICATE": {
      return { ...state };
    }
    case "auth/REMOVE_ERROR_MESSAGE": {
      return { ...state, error: null };
    }
    case "auth/LOG_IN_FAILED": {
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        error: action.payload.error,
        userId: null,
        avatar: undefined,
      };
    }
    default:
      return state;
  }
};

export default auth;
