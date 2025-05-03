import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://server-test-production-5225.up.railway.app",
  // baseURL: "http://localhost:4777",

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken") || "";
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useMainAxios = () => {
  return axiosInstance;
};
