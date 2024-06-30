"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import validate_register from "../validations/validate_register";
import { RegisterType, User } from "../types/type";
import { fetchMe, register } from "../apis/auth";
import { toast } from "react-toastify";

const initailRegister: RegisterType = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  email: "",
};

interface AuthContextType {
  registerForm: RegisterType;
  handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  errorHandler: RegisterType;
}
const defaultValue: AuthContextType = {
  registerForm: initailRegister,
  handleForm: () => {},
  handleSubmitRegister: () => {},
  errorHandler: initailRegister,
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [registerForm, setRegisterForm] = useState(initailRegister);
  const [errorHandler, setErrorHandler] = useState(initailRegister);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (token) {
        const response = await fetchMe();
        setAuthUser(response?.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(authUser);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevRegister) => ({ ...prevRegister, [name]: value }));
  };
  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(process.env.NEXT_PUBLIC_HOST);
      const errors = validate_register(registerForm);
      if (Object.values(errors).join("") === "") {
        const { confirmPassword, ...result } = registerForm;
        const response = await register(result);
        if (response.status !== 201) {
          throw new Error("client error");
        }
        window.location.replace("/auth/login");
      }
      setErrorHandler(errors);
    } catch (err: any) {
      toast.error(err?.response.data.message);
      console.log(err);
    }
  };
  const contextValue = {
    authUser,
    registerForm,
    handleForm,
    handleSubmitRegister,
    errorHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
