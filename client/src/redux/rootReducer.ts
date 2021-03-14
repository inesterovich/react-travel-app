import { combineReducers } from "redux";
import countries from "./countries";
import auth from "./auth";
import registration from "./registration";

const rootReducer = combineReducers({
  countries,
  auth,
  registration,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
