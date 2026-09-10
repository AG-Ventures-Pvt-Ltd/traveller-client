'use client';

import React from 'react';
import { X } from 'lucide-react';
import { EMPTY_FILTERS, formatMonthKey, hasActiveFilters } from '../../buildApiUrl';
import { FilterValues } from '../../types';

interface ActiveFilterChipsProps {
  value: FilterValues;
  onChange: (next: FilterValues) => void;
}

interface Chip {
  key: string;
  label: string;
  clear: (f: FilterValues) => FilterValues;
}

/** One removable chip per applied filter, so what's narrowing the list is always visible. */
function buildChips(f: FilterValues): Chip[] {
  const chips: Chip[] = [];

  f.states.forEach((state) =>
    chips.push({
      key: `state-${state}`,
      label: state,
      clear: (cur) => ({ ...cur, states: cur.states.filter((s) => s !== state) }),
    })
  );

  if (f.month) {
    chips.push({
      key: 'month',
      label: formatMonthKey(f.month),
      clear: (cur) => ({ ...cur, month: null }),
    });
  }

  if (f.minBudget !== null || f.maxBudget !== null) {
    const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;
    // Only one side may be bounded, and "Any – ₹8,000" reads like a range that starts
    // somewhere. Name the bound that actually exists instead.
    const label =
      f.minBudget !== null && f.maxBudget !== null
        ? `${rupees(f.minBudget)} – ${rupees(f.maxBudget)}`
        : f.maxBudget !== null
          ? `Up to ${rupees(f.maxBudget)}`
          : `${rupees(f.minBudget!)} and above`;

    chips.push({
      key: 'price',
      label,
      clear: (cur) => ({ ...cur, minBudget: null, maxBudget: null }),
    });
  }

  if (f.numberOfDays !== null) {
    chips.push({
      key: 'days',
      label: `Up to ${f.numberOfDays} days`,
      clear: (cur) => ({ ...cur, numberOfDays: null }),
    });
  }

  if (f.international) {
    chips.push({
      key: 'intl',
      label: 'International only',
      clear: (cur) => ({ ...cur, international: false }),
    });
  }

  return chips;
}

const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({ value, onChange }) => {
  if (!hasActiveFilters(value)) return null;

  const chips = buildChips(value);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onChange(chip.clear(value))}
          className="flex items-center gap-1.5 rounded-full border-2 border-neutral-900 bg-[#D0EF65] px-3 py-1 text-xs font-semibold capitalize text-neutral-900 transition-opacity hover:opacity-80"
        >
          {chip.label}
          <X className="h-3.5 w-3.5" />
        </button>
      ))}
      <button
        type="button"
        // Keeps the current sort — clearing filters shouldn't reorder the list too.
        onClick={() => onChange({ ...EMPTY_FILTERS, sort: value.sort })}
        className="text-xs font-bold text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilterChips;
