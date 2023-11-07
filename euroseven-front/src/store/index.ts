import authenticationReducer from "./slices/authenticationSlice";
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Action,
  Store,
} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { handle401Error } from "./middleware"; // Import the middleware you just created
// const store = configureStore({
//   reducer: {
//     player: playerReducer,
//   },
// });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// export default store;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppStore = Store<RootState, Action> & {
  dispatch: ThunkDispatch<RootState, void, Action>;
};

const store: AppStore = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware, handle401Error)
);

const persistor = persistStore(store);

export { store, persistor };
