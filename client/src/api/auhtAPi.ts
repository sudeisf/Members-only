import axios from "./axiosInstance";

export const login = (data: any) => axios.post("/auth/login", data);
export const register = (data: any) => axios.post("/auth/register", data);
export const logout = ()=> axios.post('/auth/logout')
export const refresh = () => axios.get("/auth/refresh");

export const SendOtp = (data: any) => axios.get("/auth/refresh");
export const verifyOtp = (data: any) => axios.get("/auth/refresh");
export const newPassword = (data: any) => axios.get("/auth/refresh");
