'use client';

import { Field } from 'react-final-form';
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { useState } from 'react';
import { required, validateEmail, validatePassword } from '../../utils/validations';
import CustomInput from '@/common/ui/CustomInput';
import Button from '@/common/ui/Buttons/Button';
import Link from 'next/link';

interface SignUpFormProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (value: boolean) => void;
}

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
    <div className="flex flex-col gap-5">
        <Field name="fullName" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  placeholder="Enter your full name"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  label='Full Name'
                  InputProps={{
                    startAdornment: (
                      <User className="absolute left-4 text-neutral-700" size={20} />
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
        <Field name="username" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  placeholder="Choose a username"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  label='Username'
                  InputProps={{
                    startAdornment: (
                      <User className="absolute left-4 text-neutral-700" size={20} />
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
        <Field name="email" validate={validateEmail}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
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
        <Field name="phoneNumber" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  type="tel"
                  placeholder="Enter your mobile number"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  label='Mobile Number'
                  InputProps={{
                    startAdornment: (
                      <Phone className="absolute left-4 text-neutral-700" size={20} />
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
        <Field name="password" validate={validatePassword}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
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
        <Field name="confirmPassword" validate={required}>
          {({ input, meta }) => (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <CustomInput
                  {...input}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  label='Confirm Password'
                  InputProps={{
                    startAdornment: (
                      <Lock className="absolute left-4 text-neutral-700" size={20} />
                    ),
                    endAdornment: (
                      <Button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        variant="text"
                        className="!absolute !right-0 !min-w-0 !p-2 !text-neutral-700 hover:!text-neutral-900"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
        <div className="flex justify-start items-start gap-2">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="w-4 h-4 mt-1 rounded border-2 border-gray-300 text-neutral-900 focus:ring-neutral-900"
          />
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-4">
              I agree to the
            </span>
            <Link href="/terms" className="text-neutral-900 text-base font-medium font-['Satoshi'] leading-6 hover:underline">
              Terms of Service
            </Link>
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-4">
              and
            </span>
            <Link href="/privacy-policy" className="text-neutral-900 text-base font-medium font-['Satoshi'] leading-6 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    );
  }