import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof (window as any) === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (preloadedState: any) =>
  createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

const store = configureStore({});
const persistor = persistStore(store);

export { store, persistor };
