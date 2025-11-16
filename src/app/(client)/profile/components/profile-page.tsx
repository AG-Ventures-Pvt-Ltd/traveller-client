
'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/ui/tabs";
import { Button } from "@/common/ui/button";
import { LogOut, Settings, MapPin, Bookmark, Star, MessageCircle, Users } from "lucide-react";
import { ProfileDetails } from "./profile-details";
import { BookingsTab } from "./bookings-tab";
import { PaymentMethodsTab } from "./payment-methods-tab";
import { BookmarkedTripsTab } from "./bookmarked-trips-tab";
import { ReviewsTab } from "./reviews-tab";
import { SupportTicketsTab } from "./support-tickets-tab";
import { PeopleProfilesTab } from "./people-profiles-tab";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Logo from "@/common/components/atoms/Logo/Logo";


export function ProfilePage() {

  const { data: userData } = useSession();

  console.log(userData?.user)

  const [user, setUser] = useState({
    fullName: "Sarah Anderson",
    email: "sarah.anderson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "",
    username: "sarah_anderson"
  });

  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleProfileUpdate = (updatedData: Partial<typeof user>) => {
    setUser({ ...user, ...updatedData });
    // toast.success("Profile updated successfully");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    // toast.success("Logged out successfully");
  };



  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-between items-center my-6">
        <Logo />
        <Button
          variant="outline"
          onClick={handleLogout}
          className="gap-2 backdrop-blur-sm pointer-events-auto"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>

      <div className="w-full pb-12 h-full overflow-hidden">
        <Tabs defaultValue="details" value={activeTab} onValueChange={handleTabChange} className="flex flex-col md:flex-row h-full">
          <TabsList className="flex flex-col w-full md:w-64 bg-white rounded-2xl shadow-lg p-2 border border-gray-100 h-fit gap-6 py-4">
            <TabsTrigger
              value="details"
              className="w-full flex items-center justify-start gap-3 rounded-xl transition-all px-4 py-3"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Details</span>
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="w-full flex items-center justify-start gap-3 rounded-xl transition-all px-4 py-3"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Bookings</span>
            </TabsTrigger>
            <TabsTrigger
              value="bookmarks"
              className="w-full flex items-center justify-start gap-3 rounded-xl transition-all px-4 py-3"
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-sm font-medium">Saved</span>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="w-full flex items-center justify-start gap-3 rounded-xl transition-all px-4 py-3"
            >
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Reviews</span>
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="w-full flex items-center justify-start gap-3 rounded-xl transition-all px-4 py-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Support</span>
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="w-full flex items-center justify-start gap-3 rounded-xl transition-all px-4 py-3"
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">People</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 h-[92%] bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="h-full overflow-y-auto">
              <TabsContent value="details" className="mt-0">
                <ProfileDetails user={user} />
              </TabsContent>

              <TabsContent value="bookings" className="mt-0">
                <BookingsTab />
              </TabsContent>

              <TabsContent value="bookmarks" className="mt-0">
                <BookmarkedTripsTab />
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <ReviewsTab />
              </TabsContent>

              <TabsContent value="payments" className="mt-0">
                <PaymentMethodsTab />
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <SupportTicketsTab />
              </TabsContent>

              <TabsContent value="people" className="mt-0">
                <PeopleProfilesTab />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
