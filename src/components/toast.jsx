// src/components/toast.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // add a toast
  const addToast = ({ title = "", description = "", type = "info", duration = 3000 }) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, description, type }]);

    // auto remove
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast container -> top center */}
      <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-50 flex flex-col gap-3 items-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto w-[min(95%,420px)] max-w-[420px] bg-slate-800/95 text-white rounded-lg shadow-lg p-4 border border-white/5 backdrop-blur-sm
                       transform transition-all duration-300 ease-out animate-fade-in"
            role="status"
          >
            <div className="flex items-start gap-3">
              <div className="min-w-[36px] flex items-center justify-center">
                {/* icon by type */}
                {toast.type === "success" ? (
                  <svg className="w-5 h-5 text-green-300" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : toast.type === "error" ? (
                  <svg className="w-5 h-5 text-red-300" viewBox="0 0 24 24" fill="none">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-blue-300" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              <div className="flex-1">
                {toast.title && <div className="font-semibold text-sm">{toast.title}</div>}
                {toast.description && <div className="text-xs text-slate-200/90 mt-1">{toast.description}</div>}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="ml-3 text-slate-300 hover:text-white rounded px-1"
                aria-label="close"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* tiny animation keyframes injected via inline style for fade in */}
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInSlide 260ms ease-out both;
        }
      `}</style>
    </ToastContext.Provider>
  );
}
