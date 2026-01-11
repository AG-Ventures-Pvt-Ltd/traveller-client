'use client';

import { signIn } from 'next-auth/react';
import Button from '@/common/ui/Buttons/Button';

interface GoogleSignInButtonProps {
  redirectTo?: string;
}

const GoogleSignInButton = ({ redirectTo }: GoogleSignInButtonProps) => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: redirectTo });
  };

  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      onClick={handleGoogleSignIn}
      className="!h-14 !bg-white !rounded-xl !border-2 !border-gray-200 !text-neutral-900 !normal-case !mb-6 hover:!bg-gray-50"
      startIcon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.1667 10.2273C18.1667 9.51819 18.1076 8.83637 17.9985 8.18182H10V12.05H14.6485C14.4515 13.1091 13.8864 14.0136 13.0379 14.6409V17.0409H15.7197C17.2197 15.6682 18.1667 13.6182 18.1667 10.2273Z" fill="#4285F4"/>
          <path d="M10 19.375C12.825 19.375 15.1879 18.4659 15.7197 17.0409L13.0379 14.6409C12.3197 15.1318 11.3818 15.4318 10 15.4318C7.28788 15.4318 4.98636 13.0318 4.18939 9.99091H1.41211V12.4773C2.44242 14.5273 5.03636 19.375 10 19.375Z" fill="#34A853"/>
          <path d="M4.18939 9.99091C3.94697 9.10909 3.94697 8.16364 4.18939 7.28182V4.79545H1.41211C0.150758 7.30909 0.150758 10.9636 1.41211 13.4773L4.18939 9.99091Z" fill="#FBBC04"/>
          <path d="M10 4.56818C11.475 4.56818 12.8045 5.08636 13.8439 6.07727L16.2106 3.71091C15.1879 2.76818 12.825 1.625 10 1.625C5.03636 1.625 2.44242 6.47273 1.41211 8.52273L4.18939 11.0091C4.98636 7.96818 7.28788 4.56818 10 4.56818Z" fill="#EA4335"/>
        </svg>
      }
    >
      <span className="text-base font-medium font-['Satoshi']">
        Continue with Google
      </span>
    </Button>
  );
};

export default GoogleSignInButton;