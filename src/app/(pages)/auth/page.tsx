'use client';

import { useState } from 'react';
import { Form } from 'react-final-form';
import { Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SignInForm from './components/Login/SignInForm';
import SignUpForm from './components/Register/SignUpForm';
import SideBanner from './components/SideBanner';
import { handleAuthSubmit, LoginValues, SignupValues } from './utils/authHandlers';
import { useRegisterUser } from './hooks/useRegisterUser';
import { notify } from '@/common/utils/notify';
import Button from '@/common/components/atoms/Button';


export default function Page() {

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');

  const registerMutation = useRegisterUser();

  const onSubmit = async (values: LoginValues | SignupValues) => {
    setErrorMessage(null);
    if (isLogin) {
      const result = await handleAuthSubmit(values as LoginValues);
      if (!result.success && result.error) {
        setErrorMessage(result.error);
      } else if (result.success) {
        console.log(redirectUrl,'redirect')
        const redirectTo = redirectUrl || '/';
        router.push(redirectTo);
      }
    } 
    else {

      const signupValues = values as SignupValues;
      const fullName = `${signupValues.firstName} ${signupValues.lastName}`;
      const data = {
        email: signupValues.email,
        password: signupValues.password,
        fullName,
        username: signupValues.username,
        mobileNumber: signupValues.phoneNumber,
      };
      registerMutation.mutate(data, {
        onSuccess: () => {
          notify.success('Registration successful! Please log in.');
          router.push('/trip');
        },
        onError: (error: Error) => {
          const axiosError = error as { response?: { data?: { message?: string } } };
          const errorMessage = axiosError?.response?.data?.message || error?.message || "Registration failed!";
          setErrorMessage(errorMessage);
        },
      });
    }
  };

  const handleGoogleLogin = () => {
    
    const redirectTo = redirectUrl || '/';
    signIn('google', { callbackUrl: redirectTo });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-screen w-full">
      <div className="w-full flex flex-col justify-between h-full p-8 rounded-lg">
        <Link href="/" className='font-extrabold text-3xl'>Wondrr</Link>
        <div className='w-full flex flex-col items-center  gap-4'>
          <Typography variant="h5" className="lg:w-[60%] xl:w-[48%] pb-4">
            {isLogin ? 'Sign in to Get Started' : 'Sign up to Get Started'}
          </Typography>
          <Form
            initialValues={!isLogin ? { phoneNumber: '+91' } : {}}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="flex flex-col lg:w-[60%] xl:w-[48%] gap-6 space-y-4">
                {isLogin ? <SignInForm /> : <SignUpForm />}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className='!py-2'
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
                {errorMessage && (
                  <Typography variant="body2" 
                  align='center'
                  className="!text-red-600 !text-sm !-mt-2">
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color='secondary'
                  startIcon={<Image src='/svg/GoogleLogo.svg' alt='Google' width={20} height={20} />}
                  onClick={handleGoogleLogin}
                  className='!py-2 !font-light'
                  fullWidth
                >
                  Sign in with Google
                </Button>
              </form>
            )}
          />
          <div className="text-center py-2">
            <Typography variant="body2" color="secondary" className='!font-light'>
              {isLogin ? "Don't have an account?" : 'Already have an account?'} <a href="#" className='underline' onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setErrorMessage(null); }}>{isLogin ? 'Sign up' : 'Sign in'}</a>
            </Typography>
          </div>
        </div>
        <div className='flex justify-center'>
          <Link href="/privacy-policy" className='underline'>Terms and conditions</Link>
          <span className='px-2'>•</span>
          <Link href="/privacy-policy" className='underline'>Privacy Policy</Link>
        </div>
      </div>
      <SideBanner />
    </div>
  );
}