'use client';

import React, { useEffect, useState } from 'react';
import MobileModal from '@/common/ui/MobileModal';
import TripFiltersPanel from './filters/TripFiltersPanel';
import { EMPTY_FILTERS, countActiveFilters } from '../buildApiUrl';
import { FilterMeta, FilterValues } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: FilterValues;
  onApply: (next: FilterValues) => void;
  meta?: FilterMeta;
  /** Result count for the applied filters, shown on the apply button. */
  resultCount?: number;
}

/**
 * Mobile bottom-sheet shell around the shared filter panel.
 *
 * Unlike the desktop sidebar this holds a draft and commits on Apply, because the sheet
 * covers the results — applying live would change a list the user cannot see. The draft
 * starts from the applied filters every time it opens, so the sheet can never contribute
 * a filter the user didn't choose.
 */
const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  value,
  onApply,
  meta,
  resultCount,
}) => {
  const [draft, setDraft] = useState<FilterValues>(value);

  useEffect(() => {
    if (isOpen) setDraft(value);
  }, [isOpen, value]);

  const active = countActiveFilters(draft);

  return (
    <MobileModal isOpen={isOpen} onClose={onClose} title="Filters">
      <div className="flex min-h-0 flex-col">
        {active > 0 && (
          <button
            type="button"
            onClick={() => setDraft({ ...EMPTY_FILTERS, sort: draft.sort })}
            className="mb-4 self-end text-sm font-bold text-neutral-900 underline underline-offset-2"
          >
            Clear all ({active})
          </button>
        )}

        <TripFiltersPanel value={draft} onChange={setDraft} meta={meta} />

        <div className="sticky bottom-0 -mx-6 mt-6 border-t border-neutral-200 bg-white px-6 pb-2 pt-4">
          <button
            type="button"
            onClick={() => { onApply(draft); onClose(); }}
            className="h-12 w-full rounded-xl bg-neutral-900 text-base font-bold text-white active:opacity-80"
          >
            {resultCount === undefined ? 'Show trips' : `Show ${resultCount} trips`}
          </button>
        </div>
      </div>
    </MobileModal>
  );
};

export default FilterModal;
