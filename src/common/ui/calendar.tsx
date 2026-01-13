"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";

interface CalendarProps {
  mode?: 'single' | 'range';
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  modifiers?: {
    available?: (date: Date) => boolean;
  };
  month?: Date;
  className?: string;
  disableNavigation?: boolean;
  showYearNavigation?: boolean;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Calendar({
  onSelect,
  disabled,
  modifiers,
  month,
  className,
  disableNavigation = false,
  showYearNavigation = false,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month || new Date());
  const [showYearSelector, setShowYearSelector] = React.useState(false);

  React.useEffect(() => {
    if (month) {
      setCurrentMonth(month);
    }
  }, [month]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
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

  const handlePrevYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth()));
  };

  const handleNextYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth()));
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex));
    setShowYearSelector(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth()));
    setShowYearSelector(false);
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return isSameDay(date, new Date());
  };

  return (
    <div className={cn("p-3", className)} style={{ minHeight: '240px' }}>
      {!disableNavigation && (
        <>
          {/* Year Navigation */}
          {showYearNavigation && (
            <div className="flex justify-center items-center relative mb-2">
              <button
                type="button"
                onClick={handlePrevYear}
                className="absolute left-1 p-1 hover:bg-gray-100 rounded-md opacity-50 hover:opacity-100"
                style={{ color: 'black' }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowYearSelector(!showYearSelector)}
                className="text-sm font-medium hover:bg-gray-100 px-2 py-1 rounded-md"
                style={{ color: 'black' }}
              >
                {currentMonth.getFullYear()}
              </button>
              <button
                type="button"
                onClick={handleNextYear}
                className="absolute right-1 p-1 hover:bg-gray-100 rounded-md opacity-50 hover:opacity-100"
                style={{ color: 'black' }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Month Navigation */}
          <div className="flex justify-center items-center relative mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="absolute left-1 p-1 hover:bg-gray-100 rounded-md opacity-50 hover:opacity-100"
              style={{ color: 'black' }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowYearSelector(!showYearSelector)}
              className="text-sm font-medium hover:bg-gray-100 px-2 py-1 rounded-md"
              style={{ color: 'black' }}
            >
              {MONTHS[currentMonth.getMonth()]} {showYearNavigation ? '' : currentMonth.getFullYear()}
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="absolute right-1 p-1 hover:bg-gray-100 rounded-md opacity-50 hover:opacity-100"
              style={{ color: 'black' }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Year/Month Selector */}
          {showYearSelector && (
            <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {showYearNavigation ? (
                // Year selector
                <div className="grid grid-cols-4 gap-1 p-2">
                  {Array.from({ length: 12 }, (_, i) => {
                    const year = currentMonth.getFullYear() - 5 + i;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                        className={cn(
                          "p-2 text-sm hover:bg-gray-100 rounded",
                          year === currentMonth.getFullYear() && "bg-blue-100 text-blue-600 font-medium"
                        )}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Month selector
                <div className="grid grid-cols-3 gap-1 p-2">
                  {MONTHS.map((month, index) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleMonthSelect(index)}
                      className={cn(
                        "p-2 text-sm hover:bg-gray-100 rounded",
                        index === currentMonth.getMonth() && "bg-blue-100 text-blue-600 font-medium"
                      )}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {DAYS.map(day => (
              <th key={day} className="rounded-md w-8 font-normal text-[0.8rem] p-0 text-center" style={{ color: 'black' }}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
            <tr key={weekIndex} className="mt-2">
              {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                const isDisabled = day ? disabled?.(day) : true;
                const isAvailable = day ? modifiers?.available?.(day) : false;

                return (
                  <td key={dayIndex} className="p-0 text-center relative">
                    {day ? (
                      <button
                        type="button"
                        onClick={() => !isDisabled && onSelect?.(day)}
                        disabled={isDisabled}
                        className={cn(
                          "inline-flex items-center justify-center w-8 h-8 p-0 text-sm rounded-md font-normal border border-transparent",
                          "disabled:opacity-50 disabled:cursor-not-allowed text-black hover:bg-gray-100",
                          isAvailable && "bg-primary text-white font-bold hover:bg-primary/90"
                        )}
                      >
                        {day.getDate()}
                      </button>
                    ) : (
                      <div className="w-8 h-8" />
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

export { Calendar };
