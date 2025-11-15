import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  res => ({
    data: res?.data?.data,
    message: res?.data?.message,
    status: res?.status
  }),
  async (error) => {
    const orignalRequest = error.config;
    if (error.response?.status === 401 && !orignalRequest._retry) {
      orignalRequest._retry = true;
      try {
        await axiosInstance.get("/api/v1/users/refresh-tokens");
        return axiosInstance(orignalRequest);
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject({
          status: error?.status,
          message: error?.response?.data?.message,
          data: []
        });
      }
    }
    return Promise.reject({
      status: error?.status,
      message: error?.response?.data?.message,
      data: []
    });
  }
);