'use client';

import { Field } from 'react-final-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { required, validateEmail, validatePassword } from '../../utils/validations';
import CustomInput from '@/common/ui/CustomInput';
import Link from 'next/link';

import { SignUpFormProps } from '../../types';

interface ExtendedSignUpFormProps extends SignUpFormProps {
  method: string; // 'password' or 'otp'
  showOtpInput?: boolean;
}

export default function SignUpForm({ agreeToTerms, setAgreeToTerms, method = 'otp', showOtpInput = false }: ExtendedSignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-3">
        <Field name="fullName" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  placeholder="Full Name"
                  error={meta.touched && !!meta.error}
                />
              </div>
            </div>
          )}
        </Field>
        <Field name="email" validate={validateEmail}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  type="email"
                  placeholder="Email Address"
                  error={meta.touched && !!meta.error}
                />
              </div>
            </div>
          )}
        </Field>
        <Field name="phoneNumber" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  type="tel"
                  placeholder="Mobile Number"
                  error={meta.touched && !!meta.error}
                />
              </div>
            </div>
          )}
        </Field>
        
        {method === 'otp' && showOtpInput && (
          <>
            <Field name="otp" validate={required}>
              {({ input, meta }) => (
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <CustomInput
                      {...input}
                      type="text"
                      placeholder="Enter OTP"
                      error={meta.touched && !!meta.error}
                    />
                  </div>
                </div>
              )}
            </Field>
          </>
        )}
        
        {method === 'password' && (
          <>
            <Field name="password" validate={validatePassword}>
              {({ input, meta }) => (
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <CustomInput
                      {...input}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      error={meta.touched && !!meta.error}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}
            </Field>
          </>
        )}
        <div className="flex justify-start items-start gap-2 mt-2">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="w-4 h-4 mt-1 rounded border-2 border-gray-300 text-black focus:ring-black"
          />
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-black text-sm font-normal font-['Rubik'] leading-4">
              I agree to the
            </span>
            <Link href="/terms" className="text-[#5a4eff] text-sm font-normal font-['Rubik'] leading-6 hover:underline">
              Terms of Service
            </Link>
            <span className="text-black text-sm font-normal font-['Rubik'] leading-4">
              and
            </span>
            <Link href="/privacy-policy" className="text-[#5a4eff] text-sm font-normal font-['Rubik'] leading-6 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    );
  }