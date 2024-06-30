import axiosInstance from "../config/axiosInstance";
import { LoginType, RegisterSendType } from "../types/type";

export const login = (user: LoginType) =>
  axiosInstance.post("/auth/login", user);

export const register = (user: RegisterSendType) =>
  axiosInstance.post("/auth/register", user);

export const fetchMe = () => axiosInstance.get("auth/me");
