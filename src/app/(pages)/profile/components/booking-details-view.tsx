"use client";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Badge } from "@/common/ui/badge";
import { Button } from "@/common/ui/button";
import { Separator } from "@/common/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  CreditCard, 
  Receipt, 
  Download,
  CheckCircle2,
  Clock,
  Info,
  ArrowLeft,
  Plane
} from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/common/utils/dateUtils";

interface BookingDetails {
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
  
  // Additional details
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

interface BookingDetailsViewProps {
  booking: BookingDetails;
  onBack: () => void;
  onAddReview?: (bookingId: string, rating: number, review: string) => void;
  onOpenReviewDialog?: () => void;
}

export function BookingDetailsView({ booking, onBack, onOpenReviewDialog }: BookingDetailsViewProps) {

  // Generate dummy data for demonstration
  const dummyData = {
    bookingId: booking.bookingId || `BKG${booking.id?.slice(-6) || Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    duration: booking.duration || "3 Days, 2 Nights",
    bookingDate: booking.bookingDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    
    guestDetails: booking.guestDetails || [
      { name: "John Doe", age: 28, gender: "Male" },
      { name: "Jane Smith", age: 26, gender: "Female" },
      ...(booking.totalSeats > 2 ? [{ name: "Guest 3", age: 25, gender: "Male" }] : []),
    ].slice(0, booking.totalSeats),
    
    paymentDetails: booking.paymentDetails || {
      transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      paymentMethod: "UPI (Google Pay)",
      paidAmount: booking.price,
      tax: Math.round(booking.price * 0.05),
      discount: 0,
      totalAmount: booking.price + Math.round(booking.price * 0.05),
      paymentDate: booking.bookingDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: "success" as const,
    },
    
    tripDetails: booking.tripDetails || {
      meetingPoint: "City Center, " + booking.address,
      meetingTime: "9:00 AM",
      endPoint: "City Center, " + booking.address,
      hostName: "Adventure Tours India",
      hostContact: "+91 98765 43210",
    },
    
    cancellationPolicy: booking.cancellationPolicy || `Cancellation Policy:
• Cancellation 30+ days before trip: 100% refund
• Cancellation 15-29 days before trip: 50% refund
• Cancellation 7-14 days before trip: 25% refund
• Cancellation less than 7 days before trip: No refund

In case of unforeseen circumstances or natural calamities, full refund will be provided.`,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "active":
        return "bg-[#008EF4]/10 text-[#008EF4] border-[#008EF4]/20";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download functionality
    alert("Invoice download functionality will be implemented with API integration");
  };

  return (
    <div>
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              className="border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <Receipt className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription className="mt-1">
                Booking ID: {dummyData.bookingId}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(booking.status)} variant="outline">
            {booking.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Trip Overview */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-4 p-4">
            <div className="relative sm:w-64 h-40 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={booking.image}
                alt={booking.title}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {booking.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
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
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#008EF4]" />
                    {dummyData.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Guest Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-[#008EF4]" />
            Guest Information
          </h3>
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 p-4">
            <div className="space-y-3">
              {dummyData.guestDetails.map((guest, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#008EF4]/10 rounded-full flex items-center justify-center">
                      <span className="text-[#008EF4] font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{guest.name}</p>
                      <p className="text-sm text-gray-500">
                        {guest.age} years • {guest.gender}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#008EF4]" />
            Payment Details
          </h3>
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-700">Transaction ID</span>
                </div>
                <span className="text-gray-900 font-mono text-sm">
                  {dummyData.paymentDetails.transactionId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">
                    {dummyData.paymentDetails.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(dummyData.paymentDetails.paymentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge
                    className={getPaymentStatusColor(dummyData.paymentDetails.status)}
                    variant="outline"
                  >
                    {dummyData.paymentDetails.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Base Amount</span>
                  <span>₹{dummyData.paymentDetails.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax & Fees</span>
                  <span>₹{dummyData.paymentDetails.tax.toLocaleString()}</span>
                </div>
                {dummyData.paymentDetails.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{dummyData.paymentDetails.discount.toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2">
                  <span>Total Paid</span>
                  <span>₹{dummyData.paymentDetails.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#008EF4] text-[#008EF4] hover:bg-[#008EF4] hover:text-white"
                onClick={handleDownloadInvoice}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Trip Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-[#008EF4]" />
            Trip Information
          </h3>
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Meeting Point</p>
                <p className="font-medium text-gray-900">
                  {dummyData.tripDetails.meetingPoint}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Time: {dummyData.tripDetails.meetingTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Drop Point</p>
                <p className="font-medium text-gray-900">
                  {dummyData.tripDetails.endPoint}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Host Name</p>
                <p className="font-medium text-gray-900">
                  {dummyData.tripDetails.hostName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Host Contact</p>
                <p className="font-medium text-gray-900">
                  {dummyData.tripDetails.hostContact}
                </p>
              </div>
            </div>
            <Separator className="mt-4" />
            <Button
              variant="outline"
              className="w-full mt-4 border-[#008EF4] text-[#008EF4] hover:bg-[#008EF4] hover:text-white gap-2"
              onClick={() => window.open(`/trip/${booking.slug}`, '_blank')}
            >
              <Plane className="w-4 h-4" />
              View Full Trip Details
            </Button>
          </div>
        </div>

        <Separator />

        {/* Review Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Star className="w-5 h-5 text-[#008EF4]" />
            Your Review
          </h3>
          {booking.userReview ? (
            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl border border-yellow-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= booking.userReview!.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  Reviewed on {formatDate(booking.userReview.reviewDate)}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{booking.userReview.review}</p>
            </div>
          ) : booking.status === "completed" && !booking.hasReview ? (
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 p-6 text-center">
              <p className="text-gray-600 mb-4">
                Share your experience and help other travelers!
              </p>
              <Button
                onClick={onOpenReviewDialog}
                className="gap-2 bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
              >
                <Star className="w-4 h-4" />
                Add Review
              </Button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 p-6 text-center">
              <p className="text-gray-500">No review yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}
