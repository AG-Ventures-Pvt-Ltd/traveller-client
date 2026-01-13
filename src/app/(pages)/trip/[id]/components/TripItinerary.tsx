import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TripItineraryProps, Activity } from '../types';
import Card from "@/common/ui/Card";



export function TripItinerary({ itinerary }: TripItineraryProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([]);

  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="flex flex-col gap-6 my-8">
        <h2 className="text-2xl text-[#0F172B] tracking-tight">Tour Schedule</h2>
        <div className="text-gray-500 text-center py-8">
          Itinerary details are not available yet.
        </div>
      </div>
    );
  }

  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((d) => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  const normalizeActivities = (activities: (string | Activity)[]): Activity[] => {
    return activities.map((activity) => {
      if (typeof activity === 'string') {
        return { description: activity };
      }
      return activity;
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 my-6 sm:my-8">
      <h2 className="text-[#0F172B] tracking-tight font-bold text-lg sm:text-xl">Tour Schedule</h2>
      
      <div className="flex flex-col gap-3">
        {itinerary.map((day) => {
          const isExpanded = expandedDays.includes(day.day);
          const normalizedActivities = normalizeActivities(day.activities || []);

          return (
            <Card
              key={day.day}
              variant="fill"
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                isExpanded 
                  ? 'shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_2px_16px_-2px_rgba(0,0,0,0.1)]'
                  : 'shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1)]'
              }`}
            >
              <button
                onClick={() => toggleDay(day.day)}
                className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/30 transition-colors duration-200"
              >
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-[#0D203F] rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base sm:text-lg leading-4 font-bold">
                        {day.day}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg text-[#0F172B] leading-6 sm:leading-7 font-bold">
                      {day.title}
                    </h3>
                  </div>
                </div>
                
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-[#0F172B] transition-transform duration-300 flex-shrink-0 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-white/40">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {day.description && (
                      <p className="text-sm sm:text-base text-[#334155] leading-5 sm:leading-6">
                        {day.description}
                      </p>
                    )}
                    
                    {normalizedActivities.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs sm:text-sm font-medium text-[#0F172B]">Activities</span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {normalizedActivities.map((activity, index) => (
                            <div
                              key={index}
                              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white rounded-lg border border-[#E2E8F0] text-xs sm:text-sm text-[#334155] leading-4 sm:leading-5 hover:border-[#0D203F] transition-colors duration-200"
                            >
                              {activity.description}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {day.meals && day.meals.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs sm:text-sm font-medium text-[#0F172B]">Meals Included</span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {day.meals.map((meal, index) => (
                            <div
                              key={index}
                              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[#F0FDF4] rounded-lg border border-[#86EFAC] text-xs sm:text-sm text-[#166534] leading-4 sm:leading-5"
                            >
                              {meal}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {day.duration && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569]">
                        <span className="font-medium">Duration:</span>
                        <span>{day.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
