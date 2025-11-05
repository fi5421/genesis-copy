import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { signInWithGoogle } from '@/utils/firebase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { env } from '../utils/env';

interface GoogleSignInButtonProps {
  mode?: 'signin' | 'signup';
  disabled?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
}

export const GoogleSignInButton = ({
  mode = 'signin',
  disabled = false,
  onSuccess,
  onError,
  className,
}: GoogleSignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!env.VITE_ENABLE_SIGN_UP_WITH_GOOGLE) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onSuccess?.();
    } catch (err: unknown) {
      const error = err as Error;

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            toast.error(
              `${mode === 'signup' ? 'Sign-up' : 'Sign-in'} cancelled.`,
            );
            break;
          case 'auth/popup-blocked':
            toast.error('Pop-up blocked. Please allow pop-ups and try again.');
            break;
          default:
            toast.error(
              `Failed to ${
                mode === 'signup' ? 'sign up' : 'sign in'
              } with Google. Please try again.`,
            );
        }
      } else {
        toast.error('An unknown error occurred. Please try again.');
      }

      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText =
    mode === 'signup' ? 'Continue with Google' : 'Continue with Google';

  return (
    <>
      {/* Divider */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
      </div>

      {/* Google Sign-in Button */}
      <div className="mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={disabled || isLoading}
          className={`w-full ${className || ''}`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
              {mode === 'signup' ? 'Signing up...' : 'Signing in...'}
            </div>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {buttonText}
            </>
          )}
        </Button>
      </div>
    </>
  );
};
