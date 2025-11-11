import { useState } from "react";
import { Card, Button, Dialog, DialogContent, DialogTitle, Chip, LinearProgress, Box, IconButton } from "@mui/material";
import { CalendarIcon, Users, AlertCircle, Clock, X } from "lucide-react";
import { format, addMonths } from "date-fns";
import { useRouter, useParams } from "next/navigation";
import { Calendar } from "@/common/ui/calendar";

interface AvailableDate {
  date: Date;
  price: number;
  seatsAvailable: number;
  totalSeats: number;
}

interface TripBookingCardProps {
  availableDates: AvailableDate[];
  basePrice: number;
}

export function TripBookingCard({ availableDates, basePrice }: TripBookingCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(availableDates[0]?.date);
  const [guests, setGuests] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const tripId = params.id as string;

  const selectedDateInfo = availableDates.find(
    (d) => d.date.toDateString() === selectedDate?.toDateString()
  );

  const totalPrice = (selectedDateInfo?.price || basePrice) * guests;
  const bookedSeats = selectedDateInfo ? selectedDateInfo.totalSeats - selectedDateInfo.seatsAvailable : 0;
  const bookedPercentage = selectedDateInfo ? (bookedSeats / selectedDateInfo.totalSeats) * 100 : 0;

  const isAlmostFull = selectedDateInfo && selectedDateInfo.seatsAvailable <= 3;

  return (
    <Card sx={{ p: 3, position: 'sticky', top: 16, borderColor: '#e4e4e4', borderRadius: '8px', border: '1px solid #ececec', maxWidth: '300px' }}
                elevation={0}
      >
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl text-primary">₹{selectedDateInfo?.price || basePrice}</span>
          <span className="text-gray-500">/ person</span>
        </div>

        {selectedDateInfo && isAlmostFull && (
          <Chip 
            label={`Only ${selectedDateInfo.seatsAvailable} Seats Left - Book Now!`}
            color="error"
            sx={{ width: '100%', justifyContent: 'center', py: 1, borderRadius: '8px' }}
          />
        )}

        <div className="space-y-3">
          <div>
            <label className="block mb-2">Choose Your Adventure Date</label>
            <Button 
              variant="outlined" 
              onClick={() => setCalendarOpen(true)}
              sx={{ 
                width: '100%', 
                justifyContent: 'flex-start', 
                height: 48, 
                border: 2,
                borderColor: '#e5e5e5',
                color: 'black',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'black',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CalendarIcon className="mr-2 h-5 w-5" style={{ color: '#008EF4' }} />
              {selectedDate ? format(selectedDate, "PPP") : "Select your date"}
            </Button>
            <Dialog 
              open={calendarOpen} 
              onClose={() => setCalendarOpen(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogContent>
                <IconButton
                  onClick={() => setCalendarOpen(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <X className="h-4 w-4" />
                </IconButton>
                <DialogTitle>Select Your Perfect Date</DialogTitle>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-2">Current Month</p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date: Date | undefined) => {
                        setSelectedDate(date);
                        setCalendarOpen(false);
                      }}
                      disabled={(date: Date) =>
                        !availableDates.some((d) => d.date.toDateString() === date.toDateString())
                      }
                      modifiers={{
                        available: (date: Date) =>
                          availableDates.some((d) => d.date.toDateString() === date.toDateString()),
                      }}
                      modifiersStyles={{
                        available: {
                          backgroundColor: '#008EF4',
                          color: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm mb-2">Next Month</p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date: Date | undefined) => {
                        setSelectedDate(date);
                        setCalendarOpen(false);
                      }}
                      month={addMonths(new Date(), 1)}
                      disabled={(date: Date) =>
                        !availableDates.some((d) => d.date.toDateString() === date.toDateString())
                      }
                      modifiers={{
                        available: (date: Date) =>
                          availableDates.some((d) => d.date.toDateString() === date.toDateString()),
                      }}
                      modifiersStyles={{
                        available: {
                          backgroundColor: '#008EF4',
                          color: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                    />
                  </div>
                </div>
                <Box sx={{ bgcolor: 'info.lighter', p: 2, borderRadius: 2, mt: 2 }}>
                  <p className="text-sm text-gray-700">
                    <span className="inline-block w-4 h-4 bg-primary rounded mr-2"></span>
                    Blue dates are available for booking
                  </p>
                </Box>
              </DialogContent>
            </Dialog>
          </div>

          {selectedDateInfo && (
            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 2 }}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Availability</span>
                  <span className="text-primary">{selectedDateInfo.seatsAvailable} / {selectedDateInfo.totalSeats} seats left</span>
                </div>
                <LinearProgress 
                  variant="determinate" 
                  value={bookedPercentage} 
                  sx={{ height: 8, borderRadius: 1 }}
                />
                <p className="text-xs text-gray-500">
                  {bookedSeats} travelers already secured their spot
                </p>
              </div>
            </Box>
          )}

          <div>
            <label className="block mb-2">Number of Travelers</label>
            <div className="flex items-center gap-3">
              <IconButton
                sx={{ 
                  height: 48, 
                  width: 48,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                onClick={() => setGuests(Math.max(1, guests - 1))}
              >
                -
              </IconButton>
              <div className="flex items-center gap-2 flex-1 justify-center border-2 border-gray-300 rounded-lg py-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-xl">{guests}</span>
              </div>
              <IconButton
                sx={{ 
                  height: 48, 
                  width: 48,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                onClick={() =>
                  setGuests(
                    Math.min(selectedDateInfo?.seatsAvailable || 10, guests + 1)
                  )
                }
                disabled={guests >= (selectedDateInfo?.seatsAvailable || 10)}
              >
                +
              </IconButton>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-end">
            <span className="text-gray-600">
              ₹{selectedDateInfo?.price || basePrice} × {guests} {guests > 1 ? "travelers" : "traveler"}
            </span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span>Total Price</span>
            <span className="text-2xl text-primary">₹{totalPrice}</span>
          </div>
        </div>

        <Button 
          variant="contained"
          sx={{ width: '100%', height: 56, fontSize: '1.125rem', textTransform: 'none' }}
          onClick={() => {
            const queryParams = new URLSearchParams({
              date: selectedDate ? selectedDate.toISOString() : '',
              guests: guests.toString(),
            });
            router.push(`/trip/book/${tripId}?${queryParams.toString()}`);
          }}
        >
          Grab Your Seat Now
        </Button>

        <div className="flex items-center gap-2 text-sm text-gray-600 justify-cente my-4">
          <Clock className="h-4 w-4" />
          <span>Reserve now, pay later - Free cancellation</span>
        </div>

        <Box sx={{ bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light', p: 1.5, borderRadius: 2 }}>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-700">
              <p>✓ Instant confirmation</p>
              <p>✓ Best price guarantee</p>
              <p>✓ No hidden fees</p>
            </div>
          </div>
        </Box>
      </div>
    </Card>
  );
}
