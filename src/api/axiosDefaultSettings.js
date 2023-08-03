import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

export const refresh_api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

export const main_api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});
