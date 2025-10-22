import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, setTokens, clearTokens } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  location?: string;
  role?: string;
  currency?: string;
}

interface AuthState {
  user: User | null;
  redirectTo: string | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  requireAuth: (actionName?: string) => boolean;
  updateUser: (updates: Partial<User>) => void;
  setRedirectTo: (path: string | null) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      redirectTo: null,
      isLoading: false,
      error: null,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.login({ email, password });
          
          if (response.success) {
            // Store tokens
            setTokens(response.access_token, response.refresh_token);
            
            // Store user data
            const user: User = {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              avatarUrl: response.user.avatar_url,
              currency: response.user.currency,
            };
            
            set({ user, isLoading: false });
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      signUp: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.register({ name, email, password });
          
          if (response.success) {
            // Store tokens
            setTokens(response.access_token, response.refresh_token);
            
            // Store user data
            const user: User = {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              avatarUrl: response.user.avatar_url,
              currency: response.user.currency,
            };
            
            set({ user, isLoading: false });
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        
        try {
          await authApi.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          clearTokens();
          set({ user: null, isLoading: false });
        }
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

      clearError: () => {
        set({ error: null });
      },

      initializeAuth: async () => {
        // Try to fetch current user on app load if tokens exist
        const { user } = get();
        if (!user) {
          try {
            const response = await authApi.getCurrentUser();
            if (response.success && response.user) {
              const user: User = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                avatarUrl: response.user.avatar_url,
                currency: response.user.currency,
                role: response.user.role,
                location: response.user.location,
              };
              set({ user });
            }
          } catch (error) {
            // Silent fail - user will need to login
            clearTokens();
            set({ user: null });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
