'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { INDIA_STATES } from '../consants';

interface StatesDropdownProps {
  selected: string[];
  onChange: (states: string[]) => void;
}

const StatesDropdown: React.FC<StatesDropdownProps> = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
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

  const toggle = (state: string) => {
    onChange(
      selected.includes(state)
        ? selected.filter((s) => s !== state)
        : [...selected, state]
    );
  };

  const remove = (state: string) => {
    onChange(selected.filter((s) => s !== state));
  };

  const filtered = INDIA_STATES.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white hover:border-neutral-400 transition-colors focus:outline-none"
      >
        <span className={selected.length > 0 ? 'text-neutral-900 font-medium' : 'text-neutral-400'}>
          {selected.length > 0 ? `${selected.length} state${selected.length > 1 ? 's' : ''} selected` : 'Select states...'}
        </span>
        <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search states..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-neutral-400"
              autoFocus
            />
          </div>
          <ul className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-neutral-400">No states found</li>
            )}
            {filtered.map((state) => (
              <li key={state}>
                <button
                  type="button"
                  onClick={() => toggle(state)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-gray-50 transition-colors ${
                    selected.includes(state) ? 'bg-neutral-50 font-medium text-neutral-900' : 'text-neutral-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center ${
                      selected.includes(state) ? 'bg-neutral-900 border-neutral-900' : 'border-gray-300'
                    }`}
                  >
                    {selected.includes(state) && (
                      <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white">
                        <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {state}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((state) => (
            <span
              key={state}
              className="flex items-center gap-1 bg-neutral-900 text-white text-xs font-medium px-2 py-1 rounded-full"
            >
              {state}
              <button
                type="button"
                onClick={() => remove(state)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatesDropdown;
