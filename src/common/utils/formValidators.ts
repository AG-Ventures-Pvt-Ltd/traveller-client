export const required = (msg?: string) => (v: string) => (v ? undefined : msg || 'Required')

// Email validation
export const email = (msg?: string) => (v: string) =>
  /\S+@\S+\.\S+/.test(v) ? undefined : msg || 'Invalid email address'

// Phone number validation (exactly 10 digits)
export const phoneNumber = (msg?: string) => (v: string) =>
  /^\d{10}$/.test(v) ? undefined : msg || 'Phone number must be exactly 10 digits'

// Required field validation with trimming
export const requiredTrimmed = (msg?: string) => (v: string) =>
  v && v.trim().length > 0 ? undefined : msg || 'This field is required'

// Minimum length validation
export const minLength = (min: number, msg?: string) => (v: string) =>
  v && v.length >= min ? undefined : msg || `Must be at least ${min} characters`

// Maximum length validation
export const maxLength = (max: number, msg?: string) => (v: string) =>
  !v || v.length <= max ? undefined : msg || `Must be no more than ${max} characters`

// Combined validation functions
export const composeValidators = (...validators: Array<(v: any) => string | undefined>) => (value: any) =>
  validators.reduce((error: string | undefined, validator) => error || validator(value), undefined as string | undefined)

// Traveler form validation
export const validateTravelerForm = (travelers: Array<{
  fullName: string;
  gender: string;
  email: string;
  phone: string;
  governmentId?: File | null;
}>) => {
  return travelers.every(traveler => {
    const isFullNameValid = requiredTrimmed('Full name is required')(traveler.fullName);
    const isGenderValid = requiredTrimmed('Gender is required')(traveler.gender);
    const isEmailValid = composeValidators(requiredTrimmed('Email is required'), email())(traveler.email);
    const isPhoneValid = composeValidators(requiredTrimmed('Phone number is required'), phoneNumber())(traveler.phone);
    const isGovernmentIdValid = traveler.governmentId !== null;

    return !isFullNameValid && !isGenderValid && !isEmailValid && !isPhoneValid && isGovernmentIdValid;
  });
};

// Emergency contact validation
export const validateEmergencyContact = (contact: { name: string; phone: string }) => {
  const isNameValid = requiredTrimmed('Emergency contact name is required')(contact.name);
  const isPhoneValid = composeValidators(requiredTrimmed('Emergency contact phone is required'), phoneNumber())(contact.phone);

  return !isNameValid && !isPhoneValid;
};

// Individual field validators for components
export const validators = {
  fullName: composeValidators(requiredTrimmed('Full name is required'), minLength(2, 'Full name must be at least 2 characters')),
  email: composeValidators(requiredTrimmed('Email is required'), email()),
  phone: composeValidators(requiredTrimmed('Phone number is required'), phoneNumber()),
  gender: requiredTrimmed('Please select a gender'),
  emergencyName: composeValidators(requiredTrimmed('Emergency contact name is required'), minLength(2, 'Name must be at least 2 characters')),
  emergencyPhone: composeValidators(requiredTrimmed('Emergency contact phone is required'), phoneNumber()),
};
