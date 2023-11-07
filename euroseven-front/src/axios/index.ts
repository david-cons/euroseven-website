import axios from "axios";
import { store } from "../store";
import { logout } from "../services/AuthService";

const instance = axios.create({});

instance.interceptors.request.use(function (config) {
  const token = store.getState()?.authentication.token;
  config.headers.Authorization = "Bearer " + token;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());

      return new Promise(() => {});
    } else if (!error.response || error.response.status >= 500) {
      window.location.href = "/error500";
    }
    return Promise.reject(error);
  }
);

export default instance;
