import axios from "axios";
import { HomeHistory } from "../components/shared/HomeHistoryList";
import { UserData } from "../store/types";
export const API_HOST = "http://192.168.55.90:4000";
const API_BASE_URL = `${API_HOST}/api`;
export const API_MEDIA_URL = `${API_HOST}/`;

export let _authToken: string | null = null;

const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.request.use(
  async (config) => {
    if (_authToken) {
      if (_authToken && config.headers) {
        config.headers.Authorization = "Bearer " + _authToken;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export const apiLogin = async (
  email: string,
  password: string
): Promise<UserData> => {
  const {
    data: { authToken, user },
  } = await httpClient.post("/client/auth/login", {
    email,
    password,
  });

  _authToken = authToken;
  return user;
};

export const apiGetHistories = async (all = false): Promise<HomeHistory[]> => {
  const { data: histories } = await httpClient.get(
    "/client-homes/client-histories/" + (all ? "all" : "latest")
  );

  return histories;
};

export default httpClient;
