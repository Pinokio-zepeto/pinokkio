import axios from "axios";

const BASE_URL = "~~~~~~~";

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

export const axiosInstance = axiosApi(BASE_URL);
