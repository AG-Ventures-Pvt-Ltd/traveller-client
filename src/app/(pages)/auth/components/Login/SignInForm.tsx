import { Field } from 'react-final-form';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { required } from '../../utils/validations';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-0">
      <Field name="emailOrUsername" validate={required}>
        {({ input, meta }) => (
          <TextField
            {...input}
            label="Email or Username"
            variant="outlined"
            fullWidth
            error={meta.submitFailed && !!meta.error}
            helperText={meta.submitFailed && meta.error}
            placeholder="Enter your email or username"
            className='!pb-6'
          />
        )}
      </Field>
      <Field name="password" validate={required}>
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
    </div>
  );
}