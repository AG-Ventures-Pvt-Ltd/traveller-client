import React from 'react';

interface CustomInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ElementType<any>;
  error?: boolean;
  className?: string;
  readOnly?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
  maxLength?: number;
  /** Extra native input attributes (aria-*, onFocus, onKeyDown, ...). */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  icon: Icon,
  error = false,
  className = '',
  readOnly = false,
  id,
  name,
  autoComplete,
  maxLength,
  inputProps,
}) => {
  const rowClass = `flex items-center gap-3 px-3 py-4 rounded-xl border ${
    error ? 'border-red-400' : 'border-zinc-300'
  } ${className}`;

  const inputClass = `flex-1 bg-transparent text-sm text-black placeholder-black/40 outline-none ${
    error ? 'placeholder-red-400' : ''
  }`;

  return (
    <div className={rowClass}>
      {Icon && <Icon className="w-5 h-5 text-black flex-shrink-0" weight='thin'/>}
      <input
        {...inputProps}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        id={id}
        name={name}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={error || undefined}
        className={inputClass}
      />
    </div>
  );
};


export default CustomInput