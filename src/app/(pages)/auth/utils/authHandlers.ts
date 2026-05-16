import { signIn } from 'next-auth/react';
import { LoginValues, AuthResponse } from '../types';

export const handleAuthSubmit = async (values: LoginValues, method: string = 'password'): Promise<AuthResponse> => {

  const loginValues = values;

  try {
    if (method === 'otp') {
      // Handle OTP login
      const credentials = {
        email: loginValues.emailOrUsername,
        otp: (values as any).otp,
        provider: 'otp',
      };

      const result = await signIn('credentials', {
        ...credentials,
        redirect: false, 
      });

      if (result?.error) {
        try {
          const errorData = JSON.parse(result.error);
          return {
            success: false,
            error: errorData.message || 'OTP verification failed',
            status: errorData.status,
          };
        } catch {
          return {
            success: false,
            error: result.error,
          };
        }
      }

      if (result?.ok) {
        return {
          success: true,
          message: 'Login successful',
        };
      }

      return {
        success: false,
        error: 'OTP verification failed. Please try again.',
      };
    } else {
      // Handle Password login
      const isEmail = loginValues.emailOrUsername.includes('@');

      const credentials = {
        email: isEmail ? loginValues.emailOrUsername : "",
        username: !isEmail ? loginValues.emailOrUsername : "",
        password: loginValues.password,
      };

      const result = await signIn('credentials', {
        ...credentials,
        redirect: false, 
      });

      if (result?.error) {
        try {
          const errorData = JSON.parse(result.error);
          return {
            success: false,
            error: errorData.message || 'Login failed',
            status: errorData.status,
          };
        } catch {
          return {
            success: false,
            error: result.error,
          };
        }
      }

      if (result?.ok) {
        return {
          success: true,
          message: 'Login successful',
        };
      }

      return {
        success: false,
        error: 'Login failed. Please try again.',
      };
    }

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};