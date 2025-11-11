import React from 'react';
import { Input } from '../../../../../../common/ui/input';
import { Label } from '../../../../../../common/ui/label';

const FormInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  required = false,
  value,
  onChange,
  prefix,
  dropdown = false
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-black text-base font-medium font-dm-sans">
        {label} {required && <span className="text-[#E23710]">*</span>}
      </Label>
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-black text-base font-dm-sans">{prefix}</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="#818EA1" strokeWidth="1.33" />
            </svg>
          </div>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-[52px] ${prefix ? 'pl-16' : ''} text-base font-dm-sans`}
        />
        {dropdown && !prefix && (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="#818EA1" strokeWidth="1.33" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default FormInput;
