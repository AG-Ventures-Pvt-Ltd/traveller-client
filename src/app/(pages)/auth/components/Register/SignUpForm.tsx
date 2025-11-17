import { Field } from 'react-final-form';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { required, validateEmail, validatePhone, validatePassword } from '../../utils/validations';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex gap-4 mb-0">
        <Field name="firstName" validate={required}>
          {({ input, meta }) => (
            <TextField
              {...input}
              label="First Name"
              variant="outlined"
              fullWidth
              error={meta.submitFailed && !!meta.error}
              helperText={meta.submitFailed && meta.error}
              placeholder="Enter your first name"
            />
          )}
        </Field>
        <Field name="lastName" validate={required}>
          {({ input, meta }) => (
            <TextField
              {...input}
              label="Last Name"
              variant="outlined"
              fullWidth
              error={meta.submitFailed && !!meta.error}
              helperText={meta.submitFailed && meta.error}
              placeholder="Enter your last name"
            />
          )}
        </Field>
      </div>
      <Field name="email" validate={validateEmail}>
        {({ input, meta }) => (
          <TextField
            {...input}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            error={meta.submitFailed && !!meta.error}
            helperText={meta.submitFailed && meta.error}
            placeholder="Enter your email"
          />
        )}
      </Field>
      <Field name="username" validate={required}>
        {({ input, meta }) => (
          <TextField
            {...input}
            label="Username"
            variant="outlined"
            fullWidth
            error={meta.submitFailed && !!meta.error}
            helperText={meta.submitFailed && meta.error}
            placeholder="Enter your username"
          />
        )}
      </Field>
      <Field name="phoneNumber" validate={validatePhone}>
        {({ input, meta }) => (
          <TextField
            {...input}
            label="Phone Number"
            variant="outlined"
            fullWidth
            error={meta.submitFailed && !!meta.error}
            helperText={meta.submitFailed && meta.error}
            placeholder="+91 1234567890"
          />
        )}
      </Field>
      <Field name="password" validate={validatePassword}>
        {({ input, meta }) => (
          <TextField
            {...input}
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            error={meta.submitFailed && !!meta.error}
            helperText={meta.submitFailed && meta.error}
            placeholder="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Field>
    </>
  );
}