'use client'

import React, { useState, useEffect } from 'react'
import { CalendarIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

interface TripCalendarProps {
  batches: Array<{
    batchId: string
    startDate: string | Date
    startDateTime: string | Date
    endDate?: string | Date
    endDateTime?: string | Date
    price?: number
    seatsAvailable?: number
    totalSeats?: number
    meetingPoint?: string
  }>
  selectedBatchId?: string | null
  onSelectBatch: (batchId: string) => void
  className?: string
}

interface CalendarDate {
  date: Date
  day: number
  isCurrentMonth: boolean
  isAvailable: boolean
  batchId?: string
}

export default function TripCalendar({
  batches,
  selectedBatchId,
  onSelectBatch,
  className = ''
}: TripCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const toISTDateStr = (d: Date | string) =>
    new Date(d).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) // "YYYY-MM-DD"

  // Get available dates from batches — keyed by IST date string
  const batchByISTDate = new Map(
    batches
      .filter(b => b.startDate || b.startDateTime)
      .map(b => [toISTDateStr(b.startDate || b.startDateTime), b.batchId])
  )

  // Generate calendar dates for current month
  const generateCalendarDates = (date: Date): CalendarDate[] => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const dates: CalendarDate[] = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const isCurrentMonth = current.getMonth() === month
      // Calendar cells are local midnight — format as YYYY-MM-DD directly
      const ymd = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`
      const batchId = batchByISTDate.get(ymd)
      const isAvailable = !!batchId

      dates.push({
        date: new Date(current),
        day: current.getDate(),
        isCurrentMonth,
        isAvailable,
        batchId,
      })

      current.setDate(current.getDate() + 1)
    }

    return dates
  }

  const calendarDates = generateCalendarDates(currentDate)
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const handleDateClick = (calendarDate: CalendarDate) => {
    if (calendarDate.isAvailable && calendarDate.batchId) {
      onSelectBatch(calendarDate.batchId)
      setShowCalendar(false)
    }
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  return (
    <div className={`relative ${className}`}>
        <div className="rounded-lg">
          {/* Month Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CaretLeftIcon/>
            </button>
            <div className="bg-black text-white px-4 py-2 rounded text-center font-medium">
              {monthName}
            </div>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CaretRightIcon/>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-normal py-2 ${
                  index >= 5 ? 'text-[#EEA0FF]' : 'text-gray-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDates.map((calendarDate, index) => {
              const isSelected = calendarDate.batchId === selectedBatchId
              const isWeekend = calendarDate.date.getDay() === 0 || calendarDate.date.getDay() === 6

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(calendarDate)}
                  disabled={!calendarDate.isAvailable}
                  className={`
                    w-10 h-10 rounded text-sm font-normal transition-colors
                    ${calendarDate.isCurrentMonth
                      ? calendarDate.isAvailable
                        ? isSelected
                          ? 'bg-[#EEA0FF] text-black font-medium'
                          : isWeekend
                            ? 'text-[#EEA0FF] hover:bg-[#EEA0FF] hover:bg-opacity-20'
                            : 'text-[#EEA0FF] hover:bg-gray-100'
                        : 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-300 cursor-not-allowed'
                    }
                  `}
                >
                  {calendarDate.day}
                </button>
              )
            })}
          </div>
        </div>
    </div>
  )
}