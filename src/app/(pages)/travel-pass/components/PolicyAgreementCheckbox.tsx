'use client'

import React from 'react'
import Link from 'next/link'

interface PolicyAgreementCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function PolicyAgreementCheckbox({ checked, onChange }: PolicyAgreementCheckboxProps) {
  return (
    <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#EEA0FF]"
      />
      <span>
        I have read and agree to the{' '}
        <Link href="/policy/travelpass" target="_blank" className="underline text-black font-medium">
          Terms and Conditions
        </Link>
      </span>
    </label>
  )
}
