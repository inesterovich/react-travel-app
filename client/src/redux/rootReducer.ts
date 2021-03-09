import { combineReducers } from "redux";
import countries from "./countries";

const rootReducer = combineReducers({
  countries,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
