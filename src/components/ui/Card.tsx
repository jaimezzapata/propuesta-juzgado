import React from "react";

export interface CardProps {
  children: React.ReactNode;
  variant?: "white" | "yellow" | "black" | "navy" | "gold" | "granate";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "white",
  className = "",
}) => {
  const variantStyles = {
    white: "bg-white text-[#0F172A]",
    navy: "bg-[#0F2537] text-white",
    gold: "bg-[#9A7B3E] text-white",
    yellow: "bg-[#9A7B3E] text-white",
    granate: "bg-[#6B1D2F] text-white",
    black: "bg-[#0F172A] text-white",
  };

  return (
    <div
      className={`border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] p-5 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
