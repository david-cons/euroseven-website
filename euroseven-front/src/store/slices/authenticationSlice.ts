interface AuthenticationState {
  authenticated: boolean;
  userId: string | null;
  token: string | null;
  refreshToken: string | null;
  role: string | null;
  error: string | null;
}

const initialState: AuthenticationState = {
  authenticated: false,
  userId: null,
  token: null,
  refreshToken: null,
  role: null,
  error: null,
};

type AuthenticationAction =
  | {
      type: "AUTHENTICATION_SUCCESS";
      payload: {
        userId: string;
        token: string;
        refreshToken: string;
        role: string;
      };
    }
  | { type: "AUTHENTICATION_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "NOT_AUTHORIZED" };

const authenticationReducer = (
  state: AuthenticationState = initialState,
  action: AuthenticationAction
): AuthenticationState => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        authenticated: true,
        userId: action.payload.userId,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        role: action.payload.role,
        error: null,
      };
    case "AUTHENTICATION_FAILURE":
      return {
        ...state,
        authenticated: false,
        userId: null,
        token: null,
        refreshToken: null,
        role: null,
        error: action.payload,
      };
    case "LOGOUT":
      return initialState;
    case "NOT_AUTHORIZED":
      return {
        ...state,
        error: "You are not authorized to access this resource.",
      };
    default:
      return state;
  }
};

export default authenticationReducer;
