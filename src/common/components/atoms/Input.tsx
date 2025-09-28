'use client'

import React, { useState } from 'react'
import { Field } from 'react-final-form'
import { Eye, EyeOff } from 'lucide-react'
import { required as requiredValidator } from '../../utils/formValidators'


interface Props {
  name: string
  label: string
  placeholder?: string
  type?: string
  textarea?: boolean
  options?: { value: string; label: string }[]
  validate?: (value: string) => string | undefined
  required?: boolean
  className?:string
}

interface InputProps {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onBlur: () => void
  onFocus: () => void
}

const InputField: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type = 'text',
  textarea,
  options,
  validate,
  required,
  className
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const combinedValidate = (value: string) => {
    if (required) {
      const error = requiredValidator()(value)
      if (error) return error
    }
    return validate?.(value)
  }

  const renderInput = (input: InputProps) => {
    if (type === 'select' && options)
      return (
        <select {...input} className={`w-full h-12 px-4 border rounded-lg border-border focus:outline-none ${className}`}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )

    if (textarea)
      return (
        <textarea
          {...input}
          placeholder={placeholder}
          className={`w-full min-h-[144px] px-4 py-2 border rounded-lg border-border focus:outline-none ${className}`}
        />
      )

    if (type === 'date')
      return (
        <input
          {...input}
          type="date"
          placeholder={placeholder}
          className={`w-full h-12 px-4 border rounded-lg border-border focus:outline-none ${className}`}
        />
      )

    if (type === 'password') {
      return (
        <div className="relative">
          <input
            {...input}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            className={`w-full h-12 px-4 pr-10 border rounded-lg border-border focus:outline-none ${className}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 border-border ${className}`}
          >
            {showPassword ? <EyeOff size={18} className='text-text-primary cursor-pointer' /> : <Eye size={18} className='text-text-primary cursor-pointer'/>}
          </button>
        </div>
      )
    }

    return (
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={`w-full h-12 px-4 border rounded-lg border-border focus:outline-none ${className}`}
      />
    )
  }

  return (
    <Field name={name} validate={combinedValidate}>
      {({ input, meta }) => (
        <div className={'mb-2'}>
          <label className="block mb-1 font-medium">{label}</label>
          {renderInput(input)}
          {meta.touched && meta.error && (
            <p className="text-sm text-error mt-1">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  )
}

export default InputField
