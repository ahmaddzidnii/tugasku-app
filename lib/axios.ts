import axios from "axios";

const BASE_URL = `${process.env.WEB_DOMAIN}/api/v1/`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
