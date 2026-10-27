import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "judicial" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs shadow-2xs hover:shadow-xs",
    md: "px-4 py-2 text-xs sm:text-sm shadow-2xs hover:shadow-xs",
    lg: "px-5 py-2.5 text-sm sm:text-base shadow-xs hover:shadow-sm",
  };

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-2xs",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 hover:border-slate-300 shadow-2xs",
    danger: "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80",
    judicial: "bg-slate-900 hover:bg-slate-800 text-white shadow-2xs",
    ghost: "bg-transparent hover:bg-slate-100/80 text-slate-600 shadow-none",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Procesando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
