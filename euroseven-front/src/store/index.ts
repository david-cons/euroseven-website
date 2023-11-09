import authenticationReducer from "./slices/authenticationSlice";
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Action,
  Store,
  AnyAction,
} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { handle401Error } from "./middleware";
import { composeWithDevTools } from "redux-devtools-extension";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppStore = Store<RootState, AnyAction> & {
  dispatch: ThunkDispatch<RootState, void, AnyAction>;
};

const store: AppStore = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, handle401Error))
);

const persistor = persistStore(store);

export { store, persistor };
