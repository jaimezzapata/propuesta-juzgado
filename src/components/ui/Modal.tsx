"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "xl",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const isFull = maxWidth === "full";

  const widthStyles = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    "2xl": "max-w-7xl",
    full: "w-[98vw] max-w-[98vw] h-[96vh] max-h-[96vh]",
  };

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFull ? "p-1 sm:p-2" : "p-2 sm:p-4 md:p-6"} bg-slate-900/40 backdrop-blur-xs`}>
      <div
        className={`w-full ${widthStyles[maxWidth]} bg-white rounded-3xl border border-slate-200/80 shadow-2xl flex flex-col ${isFull ? "h-[96vh]" : "max-h-[92vh]"} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between ${isFull ? "px-5 py-3" : "px-6 py-4"} bg-white border-b border-slate-100 flex-shrink-0`}>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-slate-800 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <div className={`${isFull ? "p-3 sm:p-4" : "p-5 sm:p-6"} overflow-y-auto flex-1 flex flex-col`}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

