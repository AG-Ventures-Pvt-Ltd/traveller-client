'use client';

import { Field } from 'react-final-form';
import { Eye, EyeOff } from 'lucide-react';
import { UserIcon, EnvelopeIcon, KeyIcon, PhoneIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { required, validateEmail, validatePassword } from '../../utils/validations';
import CustomInput from '@/common/ui/CustomInput';
import Button from '@/common/ui/Buttons/Button';
import Link from 'next/link';

import { SignUpFormProps } from '../../types';

export default function SignUpForm({ agreeToTerms, setAgreeToTerms }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                  helperText={meta.touched && meta.error}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserIcon className="text-black/45" size={18} weight="regular" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </Field>
        <Field name="username" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  placeholder="Username"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserIcon className="text-black/45" size={18} weight="regular" />
                        </InputAdornment>
                      ),
                    },
                  }}
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
                  helperText={meta.touched && meta.error}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EnvelopeIcon className="text-black/45" size={18} weight="regular" />
                        </InputAdornment>
                      ),
                    },
                  }}
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
                  helperText={meta.touched && meta.error}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon className="text-black/45" size={18} weight="regular" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </Field>
        <Field name="password" validate={validatePassword}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon className="text-black/45" size={18} weight="regular" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            type="button"
                            onClick={togglePasswordVisibility}
                            variant="text"
                            className="!min-w-0 !p-2 !text-black/45 hover:!text-black"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </Button>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </Field>
        <Field name="confirmPassword" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon className="text-black/45" size={18} weight="regular" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            variant="text"
                            className="!min-w-0 !p-2 !text-black/45 hover:!text-black"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </Button>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </Field>
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