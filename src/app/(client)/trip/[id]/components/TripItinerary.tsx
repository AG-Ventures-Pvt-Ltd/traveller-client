import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "@mui/material";
import { MapPin, Clock, Utensils, ChevronDown } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals?: string[];
  duration?: string;
}

interface TripItineraryProps {
  itinerary: ItineraryDay[];
}

export function TripItinerary({ itinerary }: TripItineraryProps) {
  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="space-y-4 my-8">
        <h2 className="font-bold text-2xl">Day-wise Itinerary</h2>
        <div className="text-gray-500 text-center py-8">
          Itinerary details are not available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 my-8">
      <h2 className="font-bold text-2xl">Day-wise Itinerary</h2>
      <div>
        {itinerary.map((day) => (
          <Accordion 
            key={day.day}
            sx={{
              border: 'none',
              boxShadow: 'none',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': {
                display: 'none',
              },
              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls={`day-${day.day}-content`}
              id={`day-${day.day}-header`}
            >
              <div className="flex items-center gap-3">
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {day.day}
                </Box>
                <Typography>{day.title}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-4 pl-11 pt-2">
                <Typography color="text.secondary">{day.description}</Typography>
                
                {day.duration && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{day.duration}</span>
                  </div>
                )}

                {day.activities.length > 0 && (
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Activities</Typography>
                    <ul className="space-y-2">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <Typography variant="body2">{activity}</Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.meals && day.meals.length > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'grey.50', p: 1.5, borderRadius: 1 }}>
                    <Utensils className="h-4 w-4 text-gray-500" />
                    <Typography variant="body2">Meals: {day.meals.join(", ")}</Typography>
                  </Box>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
