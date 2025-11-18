'use client';

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/common/ui/utils";

interface RangeCalendarProps {
  startDate?: Date;
  endDate?: Date;
  onRangeChange: (start: Date | undefined, end: Date | undefined) => void;
  className?: string;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function RangeCalendar({
  startDate,
  endDate,
  onRangeChange,
  className,
}: RangeCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectingStart, setSelectingStart] = React.useState(true);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isRangeStart = (date: Date) => {
    return startDate && isSameDay(date, startDate);
  };

  const isRangeEnd = (date: Date) => {
    return endDate && isSameDay(date, endDate);
  };

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return;

    if (selectingStart || !startDate) {
      onRangeChange(date, undefined);
      setSelectingStart(false);
    } else {
      if (date < startDate) {
        onRangeChange(date, startDate);
      } else {
        onRangeChange(startDate, date);
      }
      setSelectingStart(true);
    }
  };

  const formatDateRange = () => {
    if (!startDate) return 'Select dates';
    if (!endDate) return `${startDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} - ...`;
    return `${startDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} - ${endDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`;
  };

  const isDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-3", className)}>
      <div className="flex justify-between items-center mb-3">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <div className="text-sm font-semibold text-gray-900">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="text-xs text-center text-gray-600 mb-2 py-1 bg-gray-50 rounded">
        {formatDateRange()}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {DAYS.map((day, idx) => (
              <th key={idx} className="w-7 h-7 text-[0.65rem] font-medium text-gray-500 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                const disabled = day ? isDisabled(day) : true;
                const inRange = day ? isInRange(day) : false;
                const rangeStart = day ? isRangeStart(day) : false;
                const rangeEnd = day ? isRangeEnd(day) : false;

                return (
                  <td key={dayIndex} className="p-0 text-center relative">
                    {day ? (
                      <button
                        type="button"
                        onClick={() => !disabled && handleDateClick(day)}
                        disabled={disabled}
                        className={cn(
                          "relative w-7 h-7 text-[0.7rem] flex items-center justify-center transition-colors",
                          disabled && "text-gray-300 cursor-not-allowed",
                          !disabled && !inRange && !rangeStart && !rangeEnd && "text-gray-700 hover:bg-gray-100 rounded",
                          inRange && !rangeStart && !rangeEnd && "bg-blue-100 text-blue-900",
                          (rangeStart || rangeEnd) && "bg-blue-600 text-white font-semibold rounded",
                        )}
                      >
                        {day.getDate()}
                      </button>
                    ) : (
                      <div className="w-7 h-7" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
