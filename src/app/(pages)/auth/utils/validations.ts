export const required = (value: string): string | undefined => value ? undefined : 'Required';

export const validateEmail = (value: string): string | undefined => {
  if (!value) return 'Required';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Invalid email';
};

export const validatePhone = (value: string): string | undefined => {
  if (!value) return 'Required';
  const phone = value.replace(/^\+91/, '');
  return /^[6-9]\d{9}$/.test(phone) ? undefined : 'Invalid phone number (10 digits starting with 6-9)';
};

export const validatePassword = (value: string): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed) return 'Required';
  if (trimmed.length < 8) return 'Password must be at least 8 characters';
  if (!(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/.test(trimmed))) return 'Password must contain at least one letter, one number, and one special character';
  return undefined;
};