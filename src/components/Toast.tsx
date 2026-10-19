import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useRecipes();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-200 ${
              isSuccess
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                : isError
                ? 'bg-rose-900 text-rose-100 border-rose-700'
                : 'bg-stone-900 text-stone-100 border-stone-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {isError && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-amber-400 shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
