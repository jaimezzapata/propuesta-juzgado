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
    white: "bg-white text-slate-800 border-slate-200/70",
    navy: "bg-slate-900 text-white border-slate-800",
    gold: "bg-amber-50 text-amber-900 border-amber-200/80",
    yellow: "bg-amber-50 text-amber-900 border-amber-200/80",
    granate: "bg-rose-50 text-rose-900 border-rose-200/80",
    black: "bg-slate-900 text-white border-slate-800",
  };

  return (
    <div
      className={`rounded-2xl border shadow-xs hover:shadow-sm transition-all p-5 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
