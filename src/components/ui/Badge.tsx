import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "black" | "white" | "success" | "danger" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "yellow",
  size = "sm",
  className = "",
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    yellow: "bg-[#FACC15] text-black border-black",
    black: "bg-black text-white border-black",
    white: "bg-white text-black border-black",
    success: "bg-emerald-300 text-black border-black",
    danger: "bg-rose-400 text-black border-black",
    neutral: "bg-neutral-200 text-black border-black",
  };

  return (
    <span
      className={`inline-flex items-center font-extrabold uppercase tracking-wider border border-black shadow-[1px_1px_0px_#000] select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
