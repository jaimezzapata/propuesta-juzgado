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
          className="text-xs font-medium text-slate-700 flex items-center justify-between"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3.5 py-2 bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 font-normal rounded-xl border border-slate-200/80 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-2xs disabled:bg-slate-100 disabled:opacity-75 ${
          error ? "border-rose-300 ring-1 ring-rose-400" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-normal text-rose-600 mt-0.5">{error}</p>}
      {helperText && !error && (
        <p className="text-[11px] font-medium text-neutral-600">{helperText}</p>
      )}
    </div>
  );
};
