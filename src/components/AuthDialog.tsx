import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuthStore } from '@/stores/auth';
import { useToast } from './ui/use-toast';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  mode?: 'signin' | 'signup';
  redirectTo?: string;
}

export function AuthDialog({ open, onClose, mode: initialMode = 'signin', redirectTo }: AuthDialogProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { 
    signIn, 
    signUp, 
    redirectTo: storedRedirectTo, 
    setRedirectTo, 
    isLoading, 
    error, 
    clearError 
  } = useAuthStore();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Clear error when dialog opens/closes or mode changes
  useEffect(() => {
    if (!open) {
      clearError();
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [open, clearError]);

  useEffect(() => {
    clearError();
  }, [mode, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        addToast('Successfully signed in!', 'success');
      } else {
        await signUp(name, email, password);
        addToast('Account created successfully!', 'success');
      }

      onClose();
      
      // Navigate to redirectTo prop, or stored redirectTo, or default to /dashboard
      const targetPath = redirectTo || storedRedirectTo || '/dashboard';
      setRedirectTo(null); // Clear stored redirect
      navigate(targetPath, { replace: true });
    } catch (error: any) {
      // Error is already set in the store, just show toast
      addToast(error.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'signin' ? 'Sign In' : 'Create Account'}</DialogTitle>
          <DialogDescription>
            {mode === 'signin'
              ? 'Enter your credentials to access your account'
              : 'Create a free account to save and share your CVs'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isLoading}
            />
            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground">
                Minimum 6 characters
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center text-sm">
            {mode === 'signin' ? (
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
