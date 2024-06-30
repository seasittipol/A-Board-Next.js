"user client";
import useAuth from "@/app/hooks/useAuth";
import React from "react";

interface Props {
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
}

export default function InputAuth(props: Props) {
  const { registerForm, handleForm } = useAuth();
  const { name, type, placeholder, value } = props;
  return (
    <input
      className="p-2 rounded mt-2"
      name={name}
      type={type}
      placeholder={placeholder}
      value={
        value === "username"
          ? registerForm.username
          : value === "firstName"
          ? registerForm.firstName
          : value === "lastName"
          ? registerForm.lastName
          : value === "password"
          ? registerForm.password
          : value === "confirmPassword"
          ? registerForm.confirmPassword
          : registerForm.email
      }
      onChange={handleForm}
    />
  );
}
