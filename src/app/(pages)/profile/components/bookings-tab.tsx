import { useState, useEffect } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Badge } from "@/common/ui/badge";
import { Button } from "@/common/ui/button";
import { MapPin, Calendar, Users, Star, Plane } from "lucide-react";
import { AddReviewDialog } from "./add-review-dialog";
import { BookingDetailsView } from "./booking-details-view";
import Image from "next/image";
import { useGetData } from "@/services/useGetData";
import { formatDate } from "@/common/utils/dateUtils";

interface Booking {
  id: string;
  title: string;
  address: string;
  date: Date;
  totalSeats: number;
  status: "completed" | "active" | "cancelled";
  price: number;
  image: string;
  hasReview: boolean;
  slug: string;
  
  // Optional fields for booking details
  bookingDate?: Date;
  startDate?: Date;
  endDate?: Date;
  duration?: string;
  guestDetails?: {
    name: string;
    age: number;
    gender: string;
  }[];
  paymentDetails?: {
    transactionId: string;
    paymentMethod: string;
    paidAmount: number;
    tax: number;
    discount: number;
    totalAmount: number;
    paymentDate: Date;
    status: "success" | "pending" | "failed";
  };
  tripDetails?: {
    meetingPoint: string;
    meetingTime: string;
    endPoint: string;
    hostName: string;
    hostContact: string;
  };
  userReview?: {
    rating: number;
    review: string;
    reviewDate: Date;
  };
  cancellationPolicy?: string;
  bookingId?: string;
}

export function BookingsTab() {
  const { data: userData, isLoading } = useGetData<Booking[]>(`api/client/v1/user/me/trips`);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


  useEffect(() => {
    if (userData) {
      setBookings(userData);
    }
  }, [userData]);

  const handleAddReview = (bookingId: string, rating: number, review: string) => {
    // Update the booking to mark it as reviewed
    setBookings(bookings.map(b =>
      b.id === bookingId ? { 
        ...b, 
        hasReview: true,
        userReview: {
          rating,
          review,
          reviewDate: new Date()
        }
      } : b
    ));
    // TODO: Send review to API
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show booking details view if a booking is selected
  if (showDetails && selectedBooking) {
    return (
      <>
        <BookingDetailsView
          booking={selectedBooking}
          onBack={() => {
            setShowDetails(false);
            setSelectedBooking(null);
          }}
          onAddReview={handleAddReview}
          onOpenReviewDialog={() => setIsReviewDialogOpen(true)}
        />
        <AddReviewDialog
          open={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          booking={selectedBooking ? { id: selectedBooking.id, destination: selectedBooking.title } : null}
          onSubmit={handleAddReview}
        />
      </>
    );
  }

  return (
    <>
      <div >
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white sticky">
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
                  <div className="relative sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={booking.image}
                      alt={booking.address}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
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
                        {booking.title}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-600">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#008EF4]" />
                          {booking.address}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#008EF4]" />
                          {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#008EF4]" />
                          {booking.totalSeats} {booking.totalSeats === 1 ? "Guest" : "Guests"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t">
                      <p className="text-gray-900">Rs. {booking.price.toLocaleString()}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4]"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowDetails(true);
                          }}
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
      </div>

      <AddReviewDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        booking={selectedBooking ? { id: selectedBooking.id, destination: selectedBooking.title } : null}
        onSubmit={handleAddReview}
      />
    </>
  );
}
