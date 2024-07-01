import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-success h-[40px] w-[105px] rounded-md text-white"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
