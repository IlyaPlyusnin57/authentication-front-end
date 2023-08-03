import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const refresh_api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const main_api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
