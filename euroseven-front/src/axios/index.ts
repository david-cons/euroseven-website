import axios from "axios";
import { store } from "../store";

const instance = axios.create({
});

instance.interceptors.request.use(function (config) {
  const token = store.getState()?.authentication.token;
  config.headers.Authorization = "Bearer " + token;
  return config;
});

export default instance;