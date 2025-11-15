
'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/ui/tabs";
import { Card, CardContent } from "@/common/ui/card";
import { Button } from "@/common/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/ui/avatar";
import { LogOut, User, Camera, Settings, MapPin, Bookmark, Star, CreditCard, MessageCircle, Users } from "lucide-react";
import { ProfileDetails } from "./profile-details";
import { BookingsTab } from "./bookings-tab";
import { PaymentMethodsTab } from "./payment-methods-tab";
import { BookmarkedTripsTab } from "./bookmarked-trips-tab";
import { ReviewsTab } from "./reviews-tab";
import { SupportTicketsTab } from "./support-tickets-tab";
import { PeopleProfilesTab } from "./people-profiles-tab";
import { EditProfileDialog } from "./edit-profile-dialog";
import { signOut } from "next-auth/react";
// import { toast } from "sonner";

export function ProfilePage() {
  const [user, setUser] = useState({
    name: "Sarah Anderson",
    email: "sarah.anderson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "",
  });

  const [activeTab, setActiveTab] = useState("details");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

  const handleAvatarChange = () => {
    // toast.info("Avatar upload coming soon");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#008EF4] to-[#00C6FF] pt-8 pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-white">Wondrr Profile</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="gap-2 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 pointer-events-auto relative z-20"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl -mt-24 pb-12">
        {/* Profile Card */}
        <Card className="mb-8 overflow-hidden shadow-xl border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-[#008EF4] to-[#00C6FF] text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 p-2.5 bg-[#008EF4] rounded-full text-white hover:bg-[#0077CC] transition-all shadow-lg hover:scale-110"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-500 mb-6">{user.email}</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <Button 
                    onClick={() => setIsEditDialogOpen(true)} 
                    className="gap-2 bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25"
                  >
                    <User className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-gray-200 hover:border-[#008EF4] hover:text-[#008EF4]"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="details" value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-1 bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
            <TabsTrigger 
              value="details" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl transition-all"
            >
                <Settings className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Details</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bookings"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Bookings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bookmarks"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl transition-all"
              >
                <Bookmark className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Saved</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl transition-all"
              >
                <Star className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Reviews</span>
              </TabsTrigger>
              <TabsTrigger 
                value="payments"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Payment</span>
              </TabsTrigger>
              <TabsTrigger 
                value="support"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Support</span>
              </TabsTrigger>
              <TabsTrigger 
                value="people"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-xl transition-all"
              >
              <Users className="w-4 h-4" />
              <span className="text-xs sm:text-sm">People</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <ProfileDetails user={user} onEdit={() => setIsEditDialogOpen(true)} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>

          <TabsContent value="bookmarks">
            <BookmarkedTripsTab />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentMethodsTab />
          </TabsContent>

          <TabsContent value="support">
            <SupportTicketsTab />
          </TabsContent>

          <TabsContent value="people">
            <PeopleProfilesTab />
          </TabsContent>
        </Tabs>

        <EditProfileDialog
          user={user}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleProfileUpdate}
        />
      </div>
    </div>
  );
}
