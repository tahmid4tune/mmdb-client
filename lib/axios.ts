import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../utils/api-urls";

export default axios.create({
  baseURL: API_BASE_URL,
});

export const axiosAuthorized: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  data: {},
});
