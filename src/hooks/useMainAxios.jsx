import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://scoial-madia-api.vercel.app",

  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add token
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
