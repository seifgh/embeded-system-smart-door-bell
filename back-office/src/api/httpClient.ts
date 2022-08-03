import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../configs";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.request.use(
  async (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken && config.headers) {
      config.headers.Authorization = "Bearer " + authToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const res = error.response;
    if (
      res &&
      [403, 401].includes(res.status) &&
      !res.config.url?.includes("/login")
    ) {
      delete localStorage.authToken;
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default httpClient;
