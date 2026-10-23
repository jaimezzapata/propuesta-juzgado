import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-[#0F172A] flex items-center justify-between"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2 bg-white text-[#0F172A] font-medium border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] focus:outline-none focus:ring-2 focus:ring-[#9A7B3E] focus:shadow-[3px_3px_0px_#0F172A] transition-all disabled:bg-neutral-100 disabled:opacity-75 ${
          error ? "border-[#6B1D2F] ring-2 ring-red-400" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-bold text-[#6B1D2F] mt-0.5">{error}</p>}
      {helperText && !error && (
        <p className="text-[11px] font-medium text-neutral-600">{helperText}</p>
      )}
    </div>
  );
};
