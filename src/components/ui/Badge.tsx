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
    gold: "bg-amber-50 text-amber-800 border-amber-200/80",
    yellow: "bg-amber-50 text-amber-800 border-amber-200/80",
    navy: "bg-blue-50 text-blue-700 border-blue-200/60",
    granate: "bg-rose-50 text-rose-700 border-rose-200/70",
    danger: "bg-rose-50 text-rose-700 border-rose-200/70",
    slate: "bg-slate-100 text-slate-700 border-slate-200/80",
    black: "bg-slate-900 text-white border-transparent",
    white: "bg-white text-slate-700 border-slate-200/80 shadow-2xs",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    neutral: "bg-slate-100 text-slate-600 border-slate-200/60",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
