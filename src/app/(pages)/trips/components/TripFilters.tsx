'use client';

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import TripFiltersPanel from './filters/TripFiltersPanel';
import { EMPTY_FILTERS, countActiveFilters } from '../buildApiUrl';
import { FilterMeta, FilterValues } from '../types';

interface TripFiltersProps {
  value: FilterValues;
  onChange: (next: FilterValues) => void;
  meta?: FilterMeta;
}

/**
 * Desktop filter rail. No card, no border — it sits directly on the page background and
 * stays put while the results scroll. Changes apply straight away: they go into the URL,
 * which is what drives the query.
 *
 * `top-24` clears the sticky navbar (sticky top-0, py-5). No max-height or overflow of its
 * own: every section is collapsed to a control, so the rail fits the viewport, and an
 * `overflow-y-auto` here would clip the States and Month dropdown panels when they open.
 */
const TripFilters: React.FC<TripFiltersProps> = ({ value, onChange, meta }) => {
  const active = countActiveFilters(value);

  return (
    <aside className="sticky top-24 flex flex-col gap-4 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-neutral-900" />
          <h2 className="text-base font-bold text-neutral-900">Filters</h2>
          {active > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EEA0FF] px-1.5 text-[11px] font-bold text-black">
              {active}
            </span>
          )}
        </div>
        {active > 0 && (
          <button
            type="button"
            onClick={() => onChange({ ...EMPTY_FILTERS, sort: value.sort })}
            className="text-xs font-bold text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
          >
            Clear all
          </button>
        )}
      </div>

      <TripFiltersPanel value={value} onChange={onChange} meta={meta} />
    </aside>
  );
};

export default TripFilters;
