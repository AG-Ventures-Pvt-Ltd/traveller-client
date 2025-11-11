import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Star, MapPin, Calendar, MessageSquare } from "lucide-react";
import Image from "next/image";

interface Review {
  id: string;
  destination: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  image: string;
}

export function ReviewsTab() {
  const reviews: Review[] = [
    {
      id: "1",
      destination: "Bali Beach Resort",
      location: "Ubud, Bali",
      rating: 5,
      date: "May 15, 2024",
      comment: "Absolutely stunning property! The infinity pool overlooking the jungle was breathtaking. Staff was incredibly friendly and helpful. Would definitely stay here again.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
    },
    {
      id: "2",
      destination: "Swiss Alps Chalet",
      location: "Zermatt, Switzerland",
      rating: 4,
      date: "March 8, 2024",
      comment: "Amazing location with stunning mountain views. The chalet was cozy and well-equipped. Only minor issue was the heating system, but overall a fantastic experience.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    },
    {
      id: "3",
      destination: "Barcelona Beach House",
      location: "Barcelona, Spain",
      rating: 5,
      date: "January 20, 2024",
      comment: "Perfect location right by the beach! Walking distance to everything. The rooftop terrace was our favorite spot. Highly recommend for families.",
      image: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=400",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#008EF4]/10 rounded-xl">
            <MessageSquare className="w-6 h-6 text-[#008EF4]" />
          </div>
          <div>
            <CardTitle>My Reviews</CardTitle>
            <CardDescription className="mt-1">All your reviews in one place</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-[#008EF4]/50 transition-all hover:shadow-xl bg-white p-5"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative sm:w-32 h-32 sm:h-auto flex-shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={review.image}
                    alt={review.destination}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-gray-900 mb-2 group-hover:text-[#008EF4] transition-colors">
                        {review.destination}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#008EF4]" />
                          {review.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-[#008EF4]" />
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
