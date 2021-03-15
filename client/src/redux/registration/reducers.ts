import { ActionTypesRegister } from "../../types";

const initialState = {
  avatar: undefined as string | undefined,
};

type InitialStateType = typeof initialState;

// eslint-disable-next-line
const auth = (
  state: InitialStateType = initialState,
  action: ActionTypesRegister
): InitialStateType => {
  switch (action.type) {
    case "register/SETAVATAR": {
      return { ...state, avatar: action.payload.avatar };
    }
    default:
      return state;
  }
};

export default auth;
