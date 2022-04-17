import axios from "axios";
import { API_BASE_URL } from "../configs";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

export default httpClient;
