import { combineReducers } from "redux";
import countries from "./countries";
import auth from "./auth";

const rootReducer = combineReducers({
  countries,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
