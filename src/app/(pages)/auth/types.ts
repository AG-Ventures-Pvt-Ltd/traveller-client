// Auth-related types

export interface LoginValues {
  emailOrUsername: string;
  password: string;
}

export interface SignupValues {
  email: string;
  password: string;
  fullName: string;
  username: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  message?: string;
  status?: number;
}

export interface GoogleSignInButtonProps {
  redirectTo: string;
  isLogin : boolean;
}

export interface SignUpFormProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (value: boolean) => void;
}