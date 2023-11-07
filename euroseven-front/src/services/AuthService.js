import axios from "axios";

const API_URL = "http://34.147.113.108:8081/api/auth/";

export const authenticateUser = (username, password) => {
  return (dispatch) => {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          dispatch(
            authenticationSuccess(
              response.data.userId,
              response.data.accessToken,
              response.data.refreshToken,
              response.data.role
            )
          );
          // startTokenRefresh(response.data.refreshToken);
          localStorage.setItem("role", response.data.role);
          return response.data;
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

export const registerUser = (
  username,
  password,
  email,
  firstName,
  lastName
) => {
  return axios
    .post(API_URL + "register", {
      username,
      password,
      email,
      firstName,
      lastName,
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// export const tokenRefresh = (refreshToken) => {
//   console.log("refreshhh");
//   return (dispatch) => {
//     return axios
//       .post(
//         API_URL + "token",
//         { refreshToken }
//       )
//       .then((response) => {
//         if (response.data) {
//           dispatch(
//             authenticationSuccess(
//               response.data.userId,
//               response.data.accessToken,
//               response.data.refreshToken
//             )
//           );
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//         dispatch(authenticationFailure(error.message));
//       });
//   };
// };
// const startTokenRefresh = (refreshToken) => {
//   setInterval(() => {
//     store.dispatch(tokenRefresh(refreshToken));
//   }, 12000); // call every 4 minutes (240000 milliseconds)
// };

export const authenticationSuccess = (userId, token, refreshToken, role) => {
  return {
    type: "AUTHENTICATION_SUCCESS",
    payload: { userId, token, refreshToken, role },
  };
};

export const authenticationFailure = (error) => {
  return {
    type: "AUTHENTICATION_FAILURE",
    payload: error,
  };
};

export const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("selectedTab");
  localStorage.removeItem("persist:root");
  return {
    type: "LOGOUT",
  };
};

export const getRole = async (token) => {
  return axios
    .get(API_URL + "role?token=" + token)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("role", response.data);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
