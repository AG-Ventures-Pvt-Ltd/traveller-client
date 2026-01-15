import { signIn } from 'next-auth/react';
import { LoginValues, AuthResponse } from '../types';

export const handleAuthSubmit = async (values: LoginValues): Promise<AuthResponse> => {

  const loginValues = values;

  try {

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

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};