'use client';

import { Field } from 'react-final-form';
import { Eye, EyeOff } from 'lucide-react';
import { EnvelopeIcon, KeyIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { required } from '../../utils/validations';
import CustomInput from '@/common/ui/CustomInput';
import Button from '@/common/ui/Buttons/Button';
import Link from 'next/link';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
            </div>
          </div>
        )}
      </Field>
      <div className="flex justify-between items-center mt-2">
        <div className="flex justify-start items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-2 border-gray-300 text-black focus:ring-black"
          />
          <span className="text-black text-sm font-normal font-['Rubik'] leading-5">
            Remember me
          </span>
        </div>
        <Link href="/forgot-password" className="flex items-center gap-1 text-[#5a4eff] text-sm font-normal font-['Rubik'] leading-5 hover:underline">
          <KeyIcon size={14} weight="regular" />
          Forgot password?
        </Link>
      </div>
    </div>
  );
}