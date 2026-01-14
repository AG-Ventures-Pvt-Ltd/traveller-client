'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, IndianRupee } from 'lucide-react';
import Button from '@/common/components/atoms/Button';

interface TripFiltersProps {
  onFilterChange?: (filters: FilterValues) => void;
  onApplyFilters?: () => void;
}

export interface FilterValues {
  tourTypes: string[];
  priceRange: number | null;
  durations: string[];
  durationRange: number | null;
  difficulties: string[];
  minRating: number | null;
}

const TOUR_TYPES = ['Adventure', 'Cultural', 'Luxury', 'Nature', 'Relaxation'];
// const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging'];
// const RATINGS = [
//   { label: '4.5+ stars', value: 4.5 },
//   { label: '4+ stars', value: 4 },
//   { label: '3.5+ stars', value: 3.5 },
//   { label: '3+ stars', value: 3 },
// ];

const TripFilters: React.FC<TripFiltersProps> = ({ onFilterChange, onApplyFilters }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['tourType', 'priceRange', 'duration', 'difficulty', 'rating'])
  );
  const [tourTypes, setTourTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [durations, setDurations] = useState<string[]>([]);
  const [durationRange, setDurationRange] = useState<number | null>(null);
  // const [difficulties, setDifficulties] = useState<string[]>([]);
  // const [minRating, setMinRating] = useState<number | null>(null);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        tourTypes,
        priceRange,
        durations,
        durationRange,
        difficulties: [],
        minRating: null,
      });
    }
  }, [tourTypes, priceRange, durations, durationRange, onFilterChange]);
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

  const handleClearAll = () => {
    setTourTypes([]);
    setPriceRange(null);
    setDurations([]);
    setDurationRange(null);
    // setDifficulties([]);
    // setMinRating(null);
  };

  return (
    <div className="w-80 bg-white rounded-3xl border-2 border-gray-200 px-7 pt-7 pb-2 flex flex-col gap-7 sticky top-4 ">
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

      {/* Filter Sections */}
      <div className="flex flex-col gap-6">
        {/* Tour Type */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => toggleSection('tourType')}
            className="flex justify-between items-center"
          >
            <span className="text-neutral-900 text-base font-bold">Tour Type</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-700 transition-transform ${
                expandedSections.has('tourType') ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.has('tourType') && (
            <div className="flex flex-col gap-2.5">
              {TOUR_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2.5 cursor-pointer">
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

        <div className="h-px bg-gray-200" />

        {/* Duration */}
        <div className="flex flex-col gap-3">
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
                <span className="text-neutral-900 text-sm font-bold">{durationRange || 10} days</span>
              </div>
              <div className="relative h-4">
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-neutral-200 rounded-xl" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-black rounded-xl"
                  style={{ width: `${(((durationRange || 10) - 1) / 9) * 100}%` }}
                />
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={durationRange || 10}
                  onChange={(e) => setDurationRange(parseInt(e.target.value))}
                  className="absolute top-0 w-full h-4 opacity-0 cursor-pointer"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-neutral-700 rounded-full pointer-events-none"
                  style={{ left: `${(((durationRange || 10) - 1) / 9) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Difficulty */}
        {/* <div className="flex flex-col gap-3">
          <button
            onClick={() => toggleSection('difficulty')}
            className="flex justify-between items-center"
          >
            <span className="text-neutral-900 text-base font-bold">Difficulty</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-700 transition-transform ${
                expandedSections.has('difficulty') ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.has('difficulty') && (
            <div className="flex flex-col gap-2.5">
              {DIFFICULTIES.map((difficulty) => (
                <label key={difficulty} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={difficulties.includes(difficulty)}
                    onChange={() =>
                      handleCheckboxChange(difficulty, difficulties, setDifficulties)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span className="text-neutral-700 text-sm font-medium">{difficulty}</span>
                </label>
              ))}
            </div>
          )}
        </div> */}

        {/* Minimum Rating */}
        {/* <div className="flex flex-col gap-3">
          <button
            onClick={() => toggleSection('rating')}
            className="flex justify-between items-center"
          >
            <span className="text-neutral-900 text-base font-bold">Minimum Rating</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-700 transition-transform ${
                expandedSections.has('rating') ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.has('rating') && (
            <div className="flex flex-col gap-2.5">
              {RATINGS.map(({ label, value }) => (
                <label key={value} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={minRating === value}
                    onChange={() => setMinRating(minRating === value ? null : value)}
                    className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
                    <span className="text-neutral-700 text-sm font-medium">{label}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div> */}
      </div>

      {/* Apply Filters Button */}
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
