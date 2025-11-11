import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Button } from "@/common/ui/button";
import { MapPin, DollarSign, Bookmark, Heart } from "lucide-react";
import Image from "next/image";
// import { toast } from "sonner";

interface BookmarkedTrip {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
}

export function BookmarkedTripsTab() {
  const [trips, setTrips] = useState<BookmarkedTrip[]>([
    {
      id: "1",
      title: "Luxury Villa in Maldives",
      location: "Male, Maldives",
      price: 4500,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    },
    {
      id: "2",
      title: "Mountain Cabin Retreat",
      location: "Aspen, Colorado",
      price: 1200,
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
    },
    {
      id: "3",
      title: "Paris City Center Apartment",
      location: "Paris, France",
      price: 2100,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    },
    {
      id: "4",
      title: "Beachfront Bungalow",
      location: "Phuket, Thailand",
      price: 980,
      image: "https://images.unsplash.com/photo-1538964173425-93884d739596?w=800",
    },
  ]);

  const handleRemoveBookmark = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
    // toast.success("Removed from bookmarks");
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#008EF4]/10 rounded-xl">
            <Heart className="w-6 h-6 text-[#008EF4]" />
          </div>
          <div>
            <CardTitle>Saved Trips</CardTitle>
            <CardDescription className="mt-1">Your bookmarked destinations and accommodations</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-[#008EF4]/50 transition-all hover:shadow-xl bg-white"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  width={400}
                  height={224}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <button
                  onClick={() => handleRemoveBookmark(trip.id)}
                  className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all hover:scale-110"
                >
                  <Bookmark className="w-5 h-5 text-[#008EF4] fill-[#008EF4]" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white mb-1">{trip.title}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 text-[#008EF4]" />
                  <span>{trip.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-900">${trip.price}</span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
