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
  size?: 'default' | 'compact'
  dropdownMaxHeight?: number
  dropdownWidth?: number | string
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
  size = 'default',
  dropdownMaxHeight = 200,
  dropdownWidth,
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
            padding: size === 'compact' ? '8px 12px' : '14px',
            fontSize: size === 'compact' ? '14px' : '16px',
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
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: dropdownMaxHeight,
              width: dropdownWidth,
              marginTop: '4px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
          },
          MenuListProps: {
            sx: {
              maxHeight: dropdownMaxHeight,
              '& .MuiMenuItem-root': {
                fontSize: size === 'compact' ? '14px' : '16px',
                fontFamily: "'Satoshi', sans-serif",
                padding: size === 'compact' ? '8px 12px' : '12px 16px',
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0f2fe',
                  '&:hover': {
                    backgroundColor: '#bae6fd',
                  },
                },
              },
            },
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