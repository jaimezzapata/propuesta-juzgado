import React from "react";

export interface CardProps {
  children: React.ReactNode;
  variant?: "white" | "yellow" | "black";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "white",
  className = "",
}) => {
  const variantStyles = {
    white: "bg-white text-black",
    yellow: "bg-[#FACC15] text-black",
    black: "bg-black text-white",
  };

  return (
    <div
      className={`border-2 border-black shadow-[4px_4px_0px_#000] p-5 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
