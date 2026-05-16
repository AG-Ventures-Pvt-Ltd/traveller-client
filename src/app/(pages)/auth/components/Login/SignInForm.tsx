'use client';

import { Field } from 'react-final-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { required } from '../../utils/validations';
import CustomInput from '@/common/ui/CustomInput';
import Link from 'next/link';

interface SignInFormProps {
  method: string; // 'password' or 'otp'
  showOtpInput?: boolean;
}

export default function SignInForm({ method = 'otp', showOtpInput = false }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-3">
      <Field name="emailOrUsername" validate={required}>
        {({ input, meta }) => (
          <div className="flex flex-col">
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
      
      {method === 'password' && (
        <Field name="password" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-1">
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
      )}
      
      {method === 'otp' && showOtpInput && (
        <Field name="otp" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-1">
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
      )}
      
      {method === 'password' && (
        <div className="flex justify-end items-center">
          <Link href="/forgot-password" className="text-[#5a4eff] text-xs font-normal font-['Rubik'] leading-5 hover:underline">
            Forgot password?
          </Link>
        </div>
      )}
    </div>
  );
}