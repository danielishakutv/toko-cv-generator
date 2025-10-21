import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  
  addToast: (message: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: Toast = { id, message, type };
    
    set((state) => ({ toasts: [...state.toasts, toast] }));
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, 3000);
  },
  
  removeToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },
}));
