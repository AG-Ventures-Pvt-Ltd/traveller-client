import React, { useState } from 'react'
import { TextField, TextFieldProps, SxProps, Theme } from '@mui/material'
import { Upload } from 'lucide-react'

interface CustomInputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'input' | 'textarea' | 'file'
  label?: string
  required?: boolean
  accept?: string
  helperText?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  variant = 'input',
  rows = 3,
  label,
  required,
  accept,
  helperText,
  onChange,
  sx: userSx,
  ...props
}) => {
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
    if (onChange) {
      onChange(e)
    }
  }

  const defaultSx: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFF9F4',
      borderRadius: '32px',
      height: '56px',
      '& fieldset': {
        borderRadius: '14px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.45)',
        borderWidth: '1px',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.6)',
        borderWidth: '1px',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
        borderWidth: '1px',
      },
      '& .MuiInputBase-input': {
        padding: '14px 16px',
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: '16px',
        fontWeight: 400,
        fontFamily: "'Rubik', sans-serif",
      },
    },
  }

  if (variant === 'file') {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <label className="text-[#404040] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
            {label}
          </label>
          {required && (
            <span className="text-[#121212] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
              (Required)
            </span>
          )}
        </div>
        <label className="flex items-center justify-center gap-2.5 py-6 bg-white rounded-full border border-[#EDEDED] cursor-pointer hover:border-[#121212] transition-colors">
          <Upload className="w-5 h-5 text-[#404040]" strokeWidth={1.67} />
          <span className="text-[#404040] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
            {fileName || props.placeholder || 'Click to upload file'}
          </span>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {helperText && (
          <p className="text-[#404040] text-[13px] font-medium font-['Satoshi'] leading-[19.5px]">
            {helperText}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'textarea') {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-neutral-900 text-sm font-bold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={rows}
          onChange={onChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fafafa',
              borderRadius: '32px !important',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
                borderWidth: '2px',
                borderRadius: '32px !important',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
                borderWidth: '2px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#171717',
                borderWidth: '2px',
              },
              '& .MuiInputBase-input': {
                padding: '14px 16px',
                color: '#404040',
                fontSize: '18px',
                fontWeight: 500,
                fontFamily: "'Satoshi', sans-serif",
              },
            },
          }}
          {...props}
        />
      </div>
    )
  }

  // Default input variant
  const mergedSx: SxProps<Theme> = {
    ...defaultSx,
    ...(userSx || {}),
  } as SxProps<Theme>

  const inputElement = (
    <TextField
      variant="outlined"
      fullWidth
      onChange={onChange}
      sx={mergedSx}
      {...props}
    />
  )
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-primary text-sm font-bold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {inputElement}
    </div>
  )

}


export default CustomInput