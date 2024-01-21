import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8081",
});
export const URL_IMG = "http://localhost:8081/";

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default instance;
