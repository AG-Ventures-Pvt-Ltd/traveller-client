import React from 'react'
import { Select as MuiSelect, MenuItem, FormControl, SelectChangeEvent } from '@mui/material'
import { cn } from '@/common/ui/utils'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
  className?: string
  required?: boolean
  id?: string
  disabled?: boolean
  label?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  placeholder,
  options,
  className,
  required,
  id,
  disabled = false,
  label,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  const selectElement = (
    <FormControl
      fullWidth
      className={cn('relative', className)}
      required={required}
    >
      <MuiSelect
        labelId={placeholder ? `${id}-label` : undefined}
        id={id}
        value={value}
        onChange={handleChange}
        displayEmpty
        disabled={disabled}
        sx={{
          backgroundColor: '#fafafa',
          borderRadius: '12px',
          color: '#404040',
          '& .MuiSelect-select': {
            padding: '14px',
            fontSize: '16px',
            fontWeight: 500,
            fontFamily: "'Satoshi', sans-serif",
            backgroundColor: '#fafafa',
            borderRadius: '12px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5e7eb',
            borderWidth: '2px',
            borderRadius: '12px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5e7eb',
            borderWidth: '2px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#171717',
            borderWidth: '2px',
          },
        }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <span className="text-[#404040]">{placeholder}</span>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-neutral-900 text-sm font-bold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {selectElement}
    </div>
  )
}

export default CustomSelect