'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../../types';

interface SortDropdownProps {
  value: string;
  onChange: (next: string) => void;
}

/** Native <select> — it gets the platform picker on mobile for free. */
const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => (
  <label className="flex items-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-3 py-2">
    <ArrowUpDown className="h-4 w-4 shrink-0 text-neutral-500" />
    <span className="sr-only">Sort trips by</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer bg-transparent text-sm font-semibold text-neutral-900 focus:outline-none"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </label>
);

export default SortDropdown;
