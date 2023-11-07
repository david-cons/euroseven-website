import { RootState } from ".";
import { Middleware } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

interface ApiCallAction extends Action {
  error?: { status: number };
}

export const handle401Error: Middleware<
  {},
  RootState,
  ThunkDispatch<RootState, void, Action>
> =
  ({ dispatch, getState }) =>
  (next) =>
  (action: ApiCallAction) => {
    // Check if it is an API call action and it has an error with a 401 status
    if (action.error && action.error.status === 401) {
      const token = getState().authentication.token;
      if (token) {
        // Token exists, so we assume it has expired or is invalid
        dispatch({ type: "LOGOUT" }); // Dispatching logout action to reset the state
        window.location.href = "/login"; // This will redirect to the login page
      } else {
        // No token, dispatch a different action or handle however you prefer
        dispatch({ type: "NOT_AUTHORIZED" });
      }
    }
    // Otherwise, continue processing this action as usual
    return next(action);
  };
