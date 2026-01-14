'use client';

import { useState } from 'react';
import { Form } from 'react-final-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, HelpCircle, MessageCircle, Shield } from 'lucide-react';
import SignInForm from './components/Login/SignInForm';
import SignUpForm from './components/Register/SignUpForm';
import SideBanner from './components/SideBanner';
import { handleAuthSubmit, LoginValues, SignupValues } from './utils/authHandlers';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { notify } from '@/common/utils/notify';
import Button from '@/common/ui/Buttons/Button';
import Link from 'next/link';
import GoogleSignInButton from './components/GoogleSignInButton';

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const registerMutation = usePostData({ url: API_ENDPOINTS.USER.REGISTER });

  const onSubmit = async (values: LoginValues | SignupValues) => {
    setErrorMessage(null);
    if (isLogin) {
      const result = await handleAuthSubmit(values as LoginValues);
      if (!result.success && result.error) {
        setErrorMessage(result.error);
      } else if (result.success) {
        const redirectTo = redirectUrl || '/';
        router.push(redirectTo);
      }
    } else {
      const signupValues = values as SignupValues;
      const data = {
        email: signupValues.email,
        password: signupValues.password,
        fullName: signupValues.fullName,
        username: signupValues.username,
        mobileNumber: signupValues.phoneNumber || '',
      };
      try {
        await registerMutation.mutateAsync(data);
        notify.success('Registration successful! Please log in.');
        setIsLogin(true);
        setAgreeToTerms(false);
      } catch (error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const errorMessage = axiosError?.response?.data?.message || (error as Error)?.message || "Registration failed!";
        setErrorMessage(errorMessage);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage(null);
    setAgreeToTerms(false);
  };

  return (
    <div className="flex">
      <div className='md:w-1/2'>
      <SideBanner />
      </div>
      <div className={`w-full md:w-1/2 flex flex-col justify-start items-center h-screen overflow-y-scroll px-[10%] sm:px-[14%] md:px-[4%] lg:px-[8%] xl:px-[12%] pt-12 pb-8`}>
        <div className="flex flex-col gap-3 mb-8 w-full">
          <h1 className="text-neutral-900 text-4xl font-bold font-['Satoshi']">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-neutral-700 text-base font-medium font-['Satoshi']">
            {isLogin ? 'Continue your journey where you left off' : 'Start your adventure with us today'}
          </p>
        </div>
        <div className='w-full'>
          <GoogleSignInButton redirectTo={redirectUrl || '/'}/>
        </div>
        <div className="flex justify-start items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
              {isLogin ? (
                <SignInForm />
              ) : (
                <SignUpForm agreeToTerms={agreeToTerms} setAgreeToTerms={setAgreeToTerms} />
              )}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center font-medium">
                    {errorMessage}
                  </p>
                </div>
              )}
              <Button
                type="submit"
                fullWidth
                disabled={!isLogin && !agreeToTerms}
                className="!h-14 !bg-neutral-900 !rounded-xl !text-white !font-bold !text-base !normal-case hover:!bg-neutral-800 disabled:!opacity-50 disabled:!cursor-not-allowed"
                endIcon={<ArrowRight size={20} />}
              >
                <span className="font-['Satoshi']">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </span>
              </Button>
              <div className="flex justify-center items-center gap-2 mb-0">
                <span className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </span>
                <Button
                  type="button"
                  onClick={toggleMode}
                  variant="text"
                  className="!text-neutral-900 !text-base !font-bold !normal-case !p-0 !min-w-0 hover:!underline font-['Satoshi']"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Button>
              </div>
            </form>
          )}
        />
        <div className="flex justify-center items-center gap-6 pt-3 border-t border-gray-200">
          <Link href="#" className="flex items-center gap-1 text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5 hover:text-neutral-900">
            <HelpCircle size={16} />
            Help Center
          </Link>
          <Link href="#" className="flex items-center gap-1 text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5 hover:text-neutral-900">
            <MessageCircle size={16} />
            Contact Support
          </Link>
          <Link href="/privacy-policy" className="flex items-center gap-1 text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5 hover:text-neutral-900">
            <Shield size={16} />
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}