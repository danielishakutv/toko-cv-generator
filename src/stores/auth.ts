import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  location?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  redirectTo: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  requireAuth: (actionName?: string) => boolean;
  updateUser: (updates: Partial<User>) => void;
  setRedirectTo: (path: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      redirectTo: null,

      signIn: async (email: string, _password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create demo user from email
        const user: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
        };
        
        set({ user });
      },

      signUp: async (name: string, email: string, _password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
        };
        
        set({ user });
      },

      signOut: () => {
        set({ user: null });
      },

      requireAuth: (actionName?: string) => {
        const { user } = get();
        if (!user && actionName) {
          console.log(`Authentication required for: ${actionName}`);
        }
        return !!user;
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      setRedirectTo: (path: string | null) => {
        set({ redirectTo: path });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
