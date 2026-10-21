import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle2, Info, AlertOctagon, X } from 'lucide-react';

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alertConfig, setAlertConfig] = useState(null);
  const confirmBtnRef = useRef(null);

  const showAlert = useCallback((options) => {
    if (typeof options === 'string') {
      setAlertConfig({
        title: 'Notificación del Sistema',
        message: options,
        type: 'info',
        confirmText: 'Entendido'
      });
    } else {
      setAlertConfig({
        title: options.title || 'Notificación del Sistema',
        message: options.message || '',
        type: options.type || 'info',
        confirmText: options.confirmText || 'Entendido',
        onConfirm: options.onConfirm || null
      });
    }
  }, []);

  const closeAlert = useCallback(() => {
    if (alertConfig?.onConfirm) {
      alertConfig.onConfirm();
    }
    setAlertConfig(null);
  }, [alertConfig]);

  // Handle ESC and Enter keys
  useEffect(() => {
    if (!alertConfig) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAlert();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Auto-focus confirm button
    setTimeout(() => {
      confirmBtnRef.current?.focus();
    }, 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [alertConfig, closeAlert]);

  // Theme configuration for brutalist badge and icon
  const getAlertDetails = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="text-[#059669] shrink-0" size={24} />,
          badge: 'b-badge-green',
          badgeText: 'Operación Exitosa',
          borderAccent: 'border-l-[#059669]'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="text-[#ea580c] shrink-0" size={24} />,
          badge: 'b-badge-yellow',
          badgeText: 'Validación Requerida',
          borderAccent: 'border-l-[#ea580c]'
        };
      case 'error':
        return {
          icon: <AlertOctagon className="text-[#e11d48] shrink-0" size={24} />,
          badge: 'b-badge-red',
          badgeText: 'Aviso del Sistema',
          borderAccent: 'border-l-[#e11d48]'
        };
      case 'info':
      default:
        return {
          icon: <Info className="text-[#2563eb] shrink-0" size={24} />,
          badge: 'b-badge-blue',
          badgeText: 'Información de la Propuesta',
          borderAccent: 'border-l-[#2563eb]'
        };
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}

      {/* Brutalist Alert Modal Backdrop */}
      {alertConfig && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={closeAlert}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Container */}
          <div 
            className={`relative w-full max-w-lg bg-white dark:bg-[#181a1f] border-2 border-[#18181b] dark:border-[#f4f4f5] shadow-[8px_8px_0px_#18181b] dark:shadow-[8px_8px_0px_#fde047] p-5 sm:p-6 border-l-8 ${getAlertDetails(alertConfig.type).borderAccent} animate-in zoom-in-95 duration-150`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Badge & Close Icon */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className={`b-badge ${getAlertDetails(alertConfig.type).badge} font-bold text-[11px]`}>
                  {getAlertDetails(alertConfig.type).badgeText}
                </span>
                <span className="font-mono text-[10px] text-neutral-500 hidden sm:inline uppercase">
                  Convenio SENA - Juzgado 4
                </span>
              </div>

              <button
                onClick={closeAlert}
                className="p-1 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                aria-label="Cerrar alerta"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex items-start gap-3.5 mb-5">
              <div className="mt-0.5">
                {getAlertDetails(alertConfig.type).icon}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-bold text-base sm:text-lg uppercase text-neutral-900 dark:text-neutral-50 font-sans tracking-tight">
                  {alertConfig.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {alertConfig.message}
                </p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex justify-end pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                ref={confirmBtnRef}
                onClick={closeAlert}
                className="b-btn b-btn-primary text-xs py-2 px-5 font-bold uppercase tracking-wider"
              >
                {alertConfig.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
