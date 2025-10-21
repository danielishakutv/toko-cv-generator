import { useToast } from './use-toast';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Toaster() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md print-hide">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          error: <AlertCircle className="h-5 w-5 text-red-500" />,
          info: <Info className="h-5 w-5 text-blue-500" />,
        };

        const bgColors = {
          success: 'bg-green-50 border-green-200',
          error: 'bg-red-50 border-red-200',
          info: 'bg-blue-50 border-blue-200',
        };

        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-right",
              bgColors[toast.type]
            )}
          >
            {icons[toast.type]}
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
