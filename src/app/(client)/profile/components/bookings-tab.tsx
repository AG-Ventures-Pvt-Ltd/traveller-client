import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Badge } from "@/common/ui/badge";
import { Button } from "@/common/ui/button";
import { MapPin, Calendar, Users, Star, Plane } from "lucide-react";
import { AddReviewDialog } from "./add-review-dialog";
import Image from "next/image";
// import { toast } from "sonner";

interface Booking {
  id: string;
  destination: string;
  location: string;
  dates: string;
  guests: number;
  status: "completed" | "upcoming" | "cancelled";
  price: number;
  image: string;
  hasReview: boolean;
}

export function BookingsTab() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      destination: "Santorini Sunset Villa",
      location: "Santorini, Greece",
      dates: "Aug 15 - 22, 2024",
      guests: 2,
      status: "completed",
      price: 2450,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      hasReview: false,
    },
    {
      id: "2",
      destination: "Tokyo Modern Apartment",
      location: "Shibuya, Tokyo",
      dates: "Dec 10 - 17, 2024",
      guests: 1,
      status: "upcoming",
      price: 1890,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      hasReview: false,
    },
    {
      id: "3",
      destination: "Bali Beach Resort",
      location: "Ubud, Bali",
      dates: "May 5 - 12, 2024",
      guests: 4,
      status: "completed",
      price: 3200,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      hasReview: true,
    },
  ]);

  const handleAddReview = (bookingId: string, rating: number, review: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, hasReview: true } : b
    ));
    // toast.success("Review added successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "upcoming":
        return "bg-[#008EF4]/10 text-[#008EF4] border-[#008EF4]/20";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <Plane className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription className="mt-1">View and manage your past and upcoming trips</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-[#008EF4]/50 transition-all hover:shadow-xl bg-white"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <div className="relative sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={booking.image}
                      alt={booking.destination}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getStatusColor(booking.status)} shadow-lg`} variant="outline">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-gray-900 mb-3 group-hover:text-[#008EF4] transition-colors">
                        {booking.destination}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-600">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#008EF4]" />
                          {booking.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#008EF4]" />
                          {booking.dates}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#008EF4]" />
                          {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t">
                      <p className="text-gray-900">${booking.price.toLocaleString()}</p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4]"
                        >
                          View Details
                        </Button>
                        {booking.status === "completed" && !booking.hasReview && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsReviewDialogOpen(true);
                            }}
                            className="gap-2 bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
                          >
                            <Star className="w-4 h-4" />
                            Add Review
                          </Button>
                        )}
                        {booking.hasReview && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            ⭐ Reviewed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddReviewDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        booking={selectedBooking}
        onSubmit={handleAddReview}
      />
    </>
  );
}
