import axios from "axios";
import { useAuthStore } from "@/store/authStore";


const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:5000/api',
    withCredentials: true,
  });

axiosInstance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const store = useAuthStore.getState();

      if (
        error.response?.status === 401 &&
        !originalRequest._retry 
      ) {
        originalRequest._retry = true;
        try {
          await store.refreshTokenFn();
          const newToken = useAuthStore.getState().accessToken;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest); 
        } catch (refreshError) {
          store.logout(); 
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;