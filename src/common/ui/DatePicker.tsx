"use client";

import * as React from "react";
import { Calendar } from "@/common/ui/calendar";
import { cn } from "@/common/ui/utils";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  showYearNavigation?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  label,
  disabled = false,
  className,
  showYearNavigation = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const calendarRef = React.useRef<HTMLDivElement>(null);

  // Update input value when value prop changes
  React.useEffect(() => {
    if (value) {
      setInputValue(value.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleDateSelect = (date: Date | undefined) => {
    onChange?.(date);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // You could add date parsing logic here if needed
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-bold text-neutral-900 font-['Satoshi'] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium font-['Satoshi'] text-neutral-900 placeholder:text-neutral-500",
            "focus:border-neutral-900 focus:outline-none focus:ring-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            disabled && "cursor-not-allowed opacity-50"
          )}
          readOnly // Make it readonly since we're using calendar for selection
        />
        <CalendarIcon
          className={cn(
            "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500",
            disabled && "cursor-not-allowed opacity-50"
          )}
        />
      </div>

      {isOpen && (
        <div ref={calendarRef} className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            className="rounded-xl"
            showYearNavigation={showYearNavigation}
          />
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={(e) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
              setIsOpen(false);
            }
          }}
        />
      )}
    </div>
  );
}