'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface MonthOption {
  key: string | null;
  label: string;
}

interface MonthDropdownProps {
  options: MonthOption[];
  selected: string | null;
  onChange: (month: string | null) => void;
}

/**
 * Single-select month picker, styled to match `StatesDropdown`.
 *
 * Collapsed by default: thirteen options rendered inline made the filter rail taller than
 * the viewport, which forced it to scroll and defeated the sticky positioning.
 */
const MonthDropdown: React.FC<MonthDropdownProps> = ({ options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.key === selected)?.label;

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm transition-colors hover:border-neutral-400 focus:outline-none"
      >
        <span className={selected ? 'font-medium text-neutral-900' : 'text-neutral-400'}>
          {selectedLabel ?? 'Any month'}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-56 overflow-y-auto py-1">
            {options.map((option) => {
              const active = option.key === selected;
              return (
                <li key={option.key ?? 'any'}>
                  <button
                    type="button"
                    onClick={() => { onChange(option.key); setOpen(false); }}
                    className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                      active ? 'bg-neutral-50 font-medium text-neutral-900' : 'text-neutral-700'
                    }`}
                  >
                    {option.label}
                    {active && <Check className="h-4 w-4 flex-shrink-0 text-neutral-900" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonthDropdown;
