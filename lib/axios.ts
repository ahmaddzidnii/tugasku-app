import axios from "axios";

const BASE_URL = `${process.env.WEB_DOMAIN}`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
