import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "gold"
    | "navy"
    | "granate"
    | "slate"
    | "white"
    | "yellow"
    | "black"
    | "success"
    | "danger"
    | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gold",
  size = "sm",
  className = "",
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    gold: "bg-[#9A7B3E] text-white border-[#0F172A]",
    yellow: "bg-[#9A7B3E] text-white border-[#0F172A]",
    navy: "bg-[#0F2537] text-white border-[#0F172A]",
    granate: "bg-[#6B1D2F] text-white border-[#0F172A]",
    danger: "bg-[#6B1D2F] text-white border-[#0F172A]",
    slate: "bg-[#0F172A] text-white border-[#0F172A]",
    black: "bg-[#0F172A] text-white border-[#0F172A]",
    white: "bg-white text-[#0F172A] border-[#0F172A]",
    success: "bg-emerald-700 text-white border-[#0F172A]",
    neutral: "bg-neutral-200 text-[#0F172A] border-[#0F172A]",
  };

  return (
    <span
      className={`inline-flex items-center font-extrabold uppercase tracking-wider border border-[#0F172A] shadow-[1px_1px_0px_#0F172A] select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
