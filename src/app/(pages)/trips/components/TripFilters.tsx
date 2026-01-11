'use client';

import React, { useState, useEffect } from 'react';
import { RangeCalendar } from './RangeCalendar';
import Button from '@/common/ui/Buttons/Button';

interface TripFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  onApplyFilters: () => void;
}

export interface FilterValues {
  numberOfDays?: number;
  maxPeople?: number;
  minBudget?: number;
  maxBudget?: number;
  startDate?: string;
  endDate?: string;
}

const TripFilters: React.FC<TripFiltersProps> = ({ onFilterChange, onApplyFilters }) => {
  const [numberOfDays, setNumberOfDays] = useState<number>(3);
  const [maxPeople, setMaxPeople] = useState<number>(10);
  const [minBudget, setMinBudget] = useState<number>(1000);
  const [maxBudget, setMaxBudget] = useState<number>(10000);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    const filters: FilterValues = {
      numberOfDays,
      maxPeople,
      minBudget,
      maxBudget,
    };
    
    if (startDate) filters.startDate = startDate.toISOString().split('T')[0];
    if (endDate) filters.endDate = endDate.toISOString().split('T')[0];

    onFilterChange(filters);
  }, [numberOfDays, maxPeople, minBudget, maxBudget, startDate, endDate, onFilterChange]);

  const handleReset = () => {
    setNumberOfDays(3);
    setMaxPeople(10);
    setMinBudget(1000);
    setMaxBudget(10000);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="bg-white rounded-lg px-2 py-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <Button
          variant="contained"
          // size="sm"
          onClick={handleReset}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Number of Days: <span className="text-blue-600 font-semibold">{numberOfDays}</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((numberOfDays - 1) / 19) * 100}%, #e5e7eb ${((numberOfDays - 1) / 19) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between font-medium text-xs text-gray-500 ">
            <span>1 day</span>
            <span>20 days</span>
          </div>
        </div>

        {/* Max People Slider */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Max People: <span className="text-blue-600 font-semibold">{maxPeople}</span>
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={maxPeople}
            onChange={(e) => setMaxPeople(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((maxPeople - 1) / 39) * 100}%, #e5e7eb ${((maxPeople - 1) / 39) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between font-medium text-xs text-gray-500 ">
            <span>1 person</span>
            <span>40 people</span>
          </div>
        </div>

        {/* Budget Range Sliders */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Budget: <span className="text-blue-600 font-semibold">₹{minBudget.toLocaleString()} - ₹{maxBudget.toLocaleString()}</span>
          </label>
          
          <div className="mb-3">
            <div className="text-xs  text-gray-600">Min Budget</div>
            <input
              type="range"
              min="0"
              max="30000"
              step="500"
              value={minBudget}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value <= maxBudget) {
                  setMinBudget(value);
                }
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(minBudget / 30000) * 100}%, #e5e7eb ${(minBudget / 30000) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          <div>
            <div className="text-xs text-gray-600">Max Budget</div>
            <input
              type="range"
              min="0"
              max="30000"
              step="500"
              value={maxBudget}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= minBudget) {
                  setMaxBudget(value);
                }
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(maxBudget / 30000) * 100}%, #e5e7eb ${(maxBudget / 30000) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
          <div className="flex justify-between font-medium text-xs text-gray-500 mt-1">
            <span>₹0</span>
            <span>₹30,000</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Travel Dates
          </label>
          <RangeCalendar
            startDate={startDate}
            endDate={endDate}
            onRangeChange={handleRangeChange}
          />
        </div>
        <Button
          onClick={onApplyFilters}
          className="w-full"
          // variant="default"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default TripFilters;
