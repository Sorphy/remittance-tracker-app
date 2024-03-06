import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={` bg-container text-textW cursor-pointer w-full text-white  transition duration-300 ease-in-out font-medium rounded-md text-sm p-4 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${className}`}
      //  flex items-center justify-center
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
