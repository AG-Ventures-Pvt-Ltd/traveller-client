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
  modifiersStyles?: {
    available?: React.CSSProperties;
  };
  month?: Date;
  className?: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Calendar({
  selected,
  onSelect,
  disabled,
  modifiers,
  modifiersStyles,
  month,
  className,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month || new Date());

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

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return isSameDay(date, new Date());
  };

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-center items-center relative mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="absolute left-1 p-1 hover:bg-gray-100 rounded-md opacity-50 hover:opacity-100"
          style={{ color: 'black' }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium" style={{ color: 'black' }}>
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="absolute right-1 p-1 hover:bg-gray-100 rounded-md opacity-50 hover:opacity-100"
          style={{ color: 'black' }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
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
                const isSelected = day ? isSameDay(day, selected || null) : false;
                const isAvailable = day ? modifiers?.available?.(day) : false;
                const isTodayDate = isToday(day);
                
                return (
                  <td key={dayIndex} className="p-0 text-center relative">
                    {day ? (
                      <button
                        type="button"
                        onClick={() => !isDisabled && onSelect?.(day)}
                        disabled={isDisabled}
                        style={isAvailable ? modifiersStyles?.available : { color: 'black' }}
                        className={cn(
                          "inline-flex items-center justify-center w-8 h-8 p-0 text-sm rounded-md font-normal border border-transparent",
                          "hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed",
                          isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground border-black",
                          isTodayDate && !isSelected && "bg-accent text-accent-foreground border-black",
                          !isAvailable && !isSelected && !isTodayDate && "hover:border-gray-300"
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
