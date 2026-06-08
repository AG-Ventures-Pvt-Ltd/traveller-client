'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, IndianRupee } from 'lucide-react';
import Button from '@/common/components/atoms/Button';
import StatesDropdown from './StatesDropdown';

interface TripFiltersProps {
  onFilterChange?: (filters: FilterValues) => void;
  onApplyFilters?: () => void;
}

export interface FilterValues {
  states: string[];
  priceRange: number | null;
  durations: string[];
  durationRange: number | null;
  difficulties: string[];
  minRating: number | null;
  international: boolean;
}

const TripFilters: React.FC<TripFiltersProps> = ({ onFilterChange, onApplyFilters }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['destination', 'priceRange', 'duration', 'international'])
  );
  const [states, setStates] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [durationRange, setDurationRange] = useState<number | null>(null);
  const [international, setInternational] = useState<boolean>(false);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        states,
        priceRange,
        durations: [],
        durationRange,
        difficulties: [],
        minRating: null,
        international,
      });
    }
  }, [states, priceRange, durationRange, international, onFilterChange]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) newSet.delete(section);
      else newSet.add(section);
      return newSet;
    });
  };

  const handleClearAll = () => {
    setStates([]);
    setPriceRange(null);
    setDurationRange(null);
    setInternational(false);
  };

  return (
    <div className="w-80 bg-white rounded-3xl border-2 border-gray-200 px-7 pt-7 pb-6 flex flex-col gap-3 sticky top-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-5 h-5 text-neutral-900" />
          <h2 className="text-neutral-900 text-xl font-bold">Filters</h2>
        </div>
        <button
          onClick={handleClearAll}
          className="text-neutral-900 text-xs font-bold hover:text-neutral-700 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Destination (Indian States) */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => toggleSection('destination')}
            className="flex justify-between items-center"
          >
            <span className="text-neutral-900 text-base font-bold">Destination</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-700 transition-transform ${
                expandedSections.has('destination') ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.has('destination') && (
            <StatesDropdown selected={states} onChange={setStates} />
          )}
        </div>

        <div className="h-px bg-gray-200" />

        {/* International Trips */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => toggleSection('international')}
            className="flex justify-between items-center"
          >
            <span className="text-neutral-900 text-base font-bold">International</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-700 transition-transform ${
                expandedSections.has('international') ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.has('international') && (
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={international}
                onChange={(e) => setInternational(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900"
              />
              <span className="text-neutral-700 text-sm font-medium">Show international trips only</span>
            </label>
          )}
        </div>

        <div className="h-px bg-gray-200" />

        {/* Price Range */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => toggleSection('priceRange')}
            className="flex justify-between items-center"
          >
            <span className="text-neutral-900 text-base font-bold">Price Range</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-700 transition-transform ${
                expandedSections.has('priceRange') ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.has('priceRange') && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-900 text-sm font-bold flex items-center">
                  <IndianRupee className="w-3 h-3" />
                  0
                </span>
                <span className="text-neutral-900 text-sm font-bold flex items-center">
                  <IndianRupee className="w-3 h-3" />
                  {(priceRange || 20000).toLocaleString()}
                </span>
              </div>
              <div className="relative h-4">
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-neutral-200 rounded-xl" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-black rounded-xl"
                  style={{ width: `${((priceRange || 20000) / 20000) * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={priceRange || 20000}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="absolute top-0 w-full h-4 opacity-0 cursor-pointer"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-neutral-700 rounded-full pointer-events-none"
                  style={{ left: `${((priceRange || 20000) / 20000) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="h-[1px] bg-gray-200" />

        {/* Duration */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => toggleSection('duration')}
            className="flex justify-between items-center"
          >
            <span className="text-neutral-900 text-base font-bold">Duration</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-700 transition-transform ${
                expandedSections.has('duration') ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.has('duration') && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-900 text-sm font-bold">1 day</span>
                <span className="text-neutral-900 text-sm font-bold">
                  {durationRange || 14} days
                </span>
              </div>
              <div className="relative h-4">
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-neutral-200 rounded-xl" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-black rounded-xl"
                  style={{ width: `${(((durationRange || 14) - 1) / 13) * 100}%` }}
                />
                <input
                  type="range"
                  min="1"
                  max="14"
                  step="1"
                  value={durationRange || 14}
                  onChange={(e) => setDurationRange(parseInt(e.target.value))}
                  className="absolute top-0 w-full h-4 opacity-0 cursor-pointer"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-neutral-700 rounded-full pointer-events-none"
                  style={{ left: `${(((durationRange || 14) - 1) / 13) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={onApplyFilters}
        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl h-12"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default TripFilters;
