import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card";
import { Heart } from "lucide-react";
import TripCard from "../../(landing)/TripSlider/TripCard";
import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface Trip {
  _id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  tripSlug: string;
}

export function BookmarkedTripsTab() {
  const { data: trips = [], isLoading: loading } = useGetData<Trip[]>(API_ENDPOINTS.BOOKMARKS.GET_USER_BOOKMARKS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (trips.length === 0) {
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
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookmarks Yet</h3>
            <p className="text-gray-500">You haven&apos;t added any bookmarks yet. Start exploring and save your favorite trips!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            <TripCard key={trip._id} trip={trip} showBookmark={true}/>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
