'use client';

import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { useRouter, useSearchParams } from 'next/navigation';
import SignInForm from './components/Login/SignInForm';
import SignUpForm from './components/Register/SignUpForm';
import SideBanner from './components/SideBanner';
import OtpVerificationPage from './components/OtpVerification/OtpVerificationPage';
import { handleAuthSubmit } from './utils/authHandlers';
import { LoginValues, SignupValues } from './types';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { notify } from '@/common/utils/notify';
import GoogleSignInButton from './components/GoogleSignInButton';
import Button from '@/common/ui/Buttons/Button';

export default function Page() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const mode = searchParams.get('mode');
  const method = searchParams.get('method') || 'otp'; // 'password' or 'otp'

  React.useEffect(() => {
    if (!mode) {
      router.replace('/auth?mode=login&method=otp');
    }
  }, [mode, router]);

  const isLogin = mode === 'login';
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string>('');

  const registerMutation = usePostData({ url: API_ENDPOINTS.USER.REGISTER, enableNotifications : false });

  const sendOtpMutation = usePostData({ url: API_ENDPOINTS.USER.LOGIN_OTP, enableNotifications : false });

  const onSubmit = async (values: LoginValues | SignupValues) => {
    setErrorMessage(null);

    if (isLogin) {

      if (method === 'otp' && !showOtpVerification) {
        try {
          const email = (values as LoginValues).emailOrUsername;

          await sendOtpMutation.mutateAsync({
            email,
          });

          setOtpEmail(email);
          setShowOtpVerification(true);
        } catch (error) {
          const axiosError = error as { response?: { data?: { message?: string } } };
          const errorMessage = axiosError?.response?.data?.message || (error as Error)?.message || "Failed to send OTP!";
          setErrorMessage(errorMessage);
        }
        return;
      }

      // Password login flow
      const result = await handleAuthSubmit(values as LoginValues, method);
      if (!result.success && result.error) {
        setErrorMessage(result.error);
      } else if (result.success) {
        const redirectTo = redirectUrl || '/';
        router.push(redirectTo);
      }
    } else {
      // Signup flow: Register directly (backend handles OTP generation and sending)
      const signupValues = values as SignupValues;
      const data = {
        email: signupValues.email,
        password: method === 'password' ? signupValues.password : '',
        fullName: signupValues.fullName,
        mobileNumber: signupValues.phoneNumber || '',
      };
      try {
        await registerMutation.mutateAsync(data);
        notify.success('Registration successful! Please verify your email.');
        // After registration, show OTP verification page
        setOtpEmail(signupValues.email);
        setShowOtpVerification(true);
        setAgreeToTerms(false);
      } catch (error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const errorMessage = axiosError?.response?.data?.message || (error as Error)?.message || "Registration failed!";
        setErrorMessage(errorMessage);
      }
    }
  };

  const toggleMode = () => {
    setErrorMessage(null);
    setAgreeToTerms(false);
    setShowOtpVerification(false);
    setOtpEmail('');
    const newMode = isLogin ? 'signup' : 'login';
    router.push(`/auth?mode=${newMode}&method=otp`);
  };

  // Show OTP verification page if OTP has been sent
  if (showOtpVerification) {
    return (
      <div className="flex bg-[#fff9f4] min-h-screen">
        <div className='md:w-1/2'>
          <SideBanner />
        </div>
        <div className={`w-full md:w-1/2 flex flex-col justify-center items-center overflow-y-scroll px-[10%] sm:px-[14%] md:px-[4%] lg:px-[8%] xl:px-[12%] py-8 bg-[#fff9f4]`}>
          <OtpVerificationPage
            email={otpEmail}
            mode={mode || 'login'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#fff9f4] min-h-screen">
      <div className='md:w-1/2'>
        <SideBanner />
      </div>
      <div className={`w-full md:w-1/2 flex flex-col justify-center items-center overflow-y-scroll px-[10%] sm:px-[14%] md:px-[4%] lg:px-[8%] xl:px-[12%] py-8 bg-[#fff9f4]`}>
        <div className="flex flex-col gap-2 mb-8 w-full text-center">
          <h1 className="text-black text-3xl font-extrabold font-['Rubik']">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-black text-sm font-medium font-['Rubik']">
            {isLogin ? 'Happy to see you here again !' : 'You are a few steps away from travelling freely all over India'}
          </p>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              {isLogin ? (
                <SignInForm method={method} showOtpInput={false} />
              ) : (
                <SignUpForm method={method} agreeToTerms={agreeToTerms} setAgreeToTerms={setAgreeToTerms} showOtpInput={false} />
              )}
              {errorMessage && (
                  <p className="text-red-600 text-sm text-center font-medium">
                    {errorMessage}
                  </p>
              )}
              <Button
                variant='purple'
                type="submit"
                fullWidth
                className={`${method === 'otp' ? 'mt-8' : ''}`}
                disabled={!isLogin && !agreeToTerms}
              >
                {method === 'otp' ? (isLogin ? 'Log In' : 'Create Account') : (isLogin ? 'Log In' : 'Create Account')}
              </Button>
              <div className="flex justify-start items-center gap-4">
                <div className="flex-1 h-px bg-black" />
                <span className="text-black text-sm font-light font-['Rubik'] leading-5">or</span>
                <div className="flex-1 h-px bg-black" />
              </div>
              <div className='w-full flex flex-col gap-3'>
                <GoogleSignInButton isLogin={isLogin} redirectTo={redirectUrl || '/'} />
              </div>
              {/* <div className="flex justify-center gap-2 text-sm font-['Rubik']">
                <span className="text-black">Try {method === 'password' ? 'OTP' : 'Password'} instead?</span>
                <a
                  onClick={() => {
                    const newMethod = method === 'password' ? 'otp' : 'password';
                    router.push(`/auth?mode=${isLogin ? 'login' : 'signup'}&method=${newMethod}`);
                  }}
                  className="text-[#5a4eff] underline cursor-pointer"
                >
                  Use {method === 'password' ? 'OTP' : 'Password'}
                </a>
              </div> */}
              <div className="flex justify-center items-center mb-20 text-[#5a4eff]">
                <span className=" text-sm font-normal font-['Rubik']">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                </span>
                <a
                  onClick={toggleMode}
                  className="!text-sm font-['Rubik'] underline cursor-pointer ml-1"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </a>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}