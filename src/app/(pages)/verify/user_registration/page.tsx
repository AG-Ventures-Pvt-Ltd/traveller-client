'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import Loader from '@/common/ui/Loader/Loader';
import { notify } from '@/common/utils/notify';

interface VerificationResponse {
  message: string;
  success: boolean;
}

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [apiUrl, setApiUrl] = useState<string | null>(null);

  useEffect(() => {
    if (token && email) {
      setApiUrl(API_ENDPOINTS.USER.VERIFY_EMAIL(token, email));
    }
  }, [token, email]);

  const { data, isLoading, error } = useGetData<VerificationResponse>(apiUrl || '', {
    queryKey: apiUrl ? [apiUrl] : ['verification-loading'],
    enabled: !!apiUrl,
  });

  useEffect(() => {
    if (data?.success) {
      notify.success(data.message || 'Email verified successfully!');
    }
    if (error) {
      notify.error(error.message || 'Email verification failed. Please try again.');
    }
  }, [data, error]);

  if (!token || !email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Verification Link</h1>
          <p className="text-muted-foreground">
            The verification link is invalid or missing required parameters. Please check your email and try again.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader />
        <p className="mt-4 text-muted-foreground">Verifying your email...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Verification Failed</h1>
          <p className="text-muted-foreground mb-6">
            {error.message || 'We could not verify your email. The link may have expired or is invalid.'}
          </p>
          <a
            href="/auth"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Email Verified Successfully!</h1>
          <p className="text-muted-foreground mb-6">
            {data.message || 'Your email has been verified. You can now log in to your account.'}
          </p>
          <a
            href="/auth"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return null;
}
