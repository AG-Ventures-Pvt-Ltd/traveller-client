'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, IndianRupee } from 'lucide-react';
import MobileModal from '@/common/ui/MobileModal';
import Button from '@/common/components/atoms/Button';
import { FilterValues } from './TripFilters';
import { TRIP_CATEGORIES } from '../consants';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: FilterValues) => void;
  onApplyFilters: () => void;
}


const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onFilterChange,
  onApplyFilters,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['tourType', 'priceRange', 'duration'])
  );

  // Local state for modal filters
  const [tourTypes, setTourTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [durationRange, setDurationRange] = useState<number>(5);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleCheckboxChange = (
    value: string,
    currentValues: string[],
    setter: (values: string[]) => void
  ) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((v) => v !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  const handleApply = () => {
    // Update parent filters
    onFilterChange({
      tourTypes,
      priceRange,
      durations: [],
      durationRange,
      difficulties: [],
      minRating: null,
    });
    onApplyFilters();
    onClose();
  };

  const handleClearAll = () => {
    setTourTypes([]);
    setPriceRange(5000);
    setDurationRange(5);
  };

  return (
    <MobileModal isOpen={isOpen} onClose={onClose} title="Filters">
      <div className="flex flex-col min-h-0">
        {/* Header with Clear All */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-neutral-900" />
            <h2 className="text-neutral-900 text-lg font-bold">Filters</h2>
          </div>
          <button
            onClick={handleClearAll}
            className="text-neutral-900 text-sm font-bold hover:text-neutral-700 transition-colors"
          >
            Clear all
          </button>
        </div>

        {/* Filter Sections */}
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
          {/* Tour Type */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => toggleSection('tourType')}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-neutral-900 text-base font-bold">Tour Type</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-700 transition-transform ${
                  expandedSections.has('tourType') ? '' : '-rotate-90'
                }`}
              />
            </button>
            {expandedSections.has('tourType') && (
              <div className="grid grid-cols-2 gap-3 pl-4">
                {TRIP_CATEGORIES.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tourTypes.includes(type)}
                      onChange={() => handleCheckboxChange(type, tourTypes, setTourTypes)}
                      className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <span className="text-neutral-700 text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-gray-200" />

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => toggleSection('priceRange')}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-neutral-900 text-base font-bold">Price Range</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-700 transition-transform ${
                  expandedSections.has('priceRange') ? '' : '-rotate-90'
                }`}
              />
            </button>
            {expandedSections.has('priceRange') && (
              <div className="flex flex-col gap-4 pl-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-900 text-sm font-bold flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    0
                  </span>
                  <span className="text-neutral-900 text-sm font-bold flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    {priceRange.toLocaleString()}
                  </span>
                </div>
                <div className="relative h-6">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-neutral-200 rounded-xl" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-2 bg-black rounded-xl"
                    style={{ width: `${(priceRange / 20000) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="absolute top-0 w-full h-6 opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-700 rounded-full pointer-events-none"
                    style={{ left: `${(priceRange / 20000) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-gray-200" />

          {/* Duration */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => toggleSection('duration')}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-neutral-900 text-base font-bold">Duration</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-700 transition-transform ${
                  expandedSections.has('duration') ? '' : '-rotate-90'
                }`}
              />
            </button>
            {expandedSections.has('duration') && (
              <div className="flex flex-col gap-4 pl-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-900 text-sm font-bold">1 day</span>
                  <span className="text-neutral-900 text-sm font-bold">{durationRange} days</span>
                </div>
                <div className="relative h-6">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-neutral-200 rounded-xl" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-2 bg-black rounded-xl"
                    style={{ width: `${((durationRange - 1) / 9) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={durationRange}
                    onChange={(e) => setDurationRange(parseInt(e.target.value))}
                    className="absolute top-0 w-full h-6 opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-700 rounded-full pointer-events-none"
                    style={{ left: `${((durationRange - 1) / 9) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            onClick={handleApply}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl h-12"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </MobileModal>
  );
};

export default FilterModal;
