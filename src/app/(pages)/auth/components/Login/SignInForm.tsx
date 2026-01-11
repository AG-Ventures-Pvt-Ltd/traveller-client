'use client';

import { Field } from 'react-final-form';
import { Eye, EyeOff, Mail, Lock, KeyRound } from 'lucide-react';
import { useState } from 'react';
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
    <div className="flex flex-col gap-5">
      <Field name="emailOrUsername" validate={required}>
        {({ input, meta }) => (
          <div className="flex flex-col">
            <div className="relative">
              <CustomInput
                {...input}
                type="email"
                placeholder="Enter your email"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                label='Email Address'
                InputProps={{
                  startAdornment: (
                    <Mail className="absolute left-4 text-neutral-700" size={20} />
                  ),
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    paddingLeft: '48px !important',
                  },
                }}
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
                placeholder="Enter your password"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                label='Password'
                InputProps={{
                  startAdornment: (
                    <Lock className="absolute left-4 text-neutral-700" size={20} />
                  ),
                  endAdornment: (
                    <Button
                      type="button"
                      onClick={togglePasswordVisibility}
                      variant="text"
                      className="!absolute !right-0 !min-w-0 !p-2 !text-neutral-700 hover:!text-neutral-900"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    paddingLeft: '48px !important',
                    paddingRight: '48px !important',
                  },
                }}
              />
            </div>
          </div>
        )}
      </Field>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-2 border-gray-300 text-neutral-900 focus:ring-neutral-900"
          />
          <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5">
            Remember me
          </span>
        </div>
        <Link href="/forgot-password" className="flex items-center gap-1 text-neutral-900 text-sm font-medium font-['Satoshi'] leading-5 hover:underline">
          <KeyRound size={14} />
          Forgot password?
        </Link>
      </div>
    </div>
  );
}