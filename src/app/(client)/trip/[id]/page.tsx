'use client'

import { TripImageGallery } from "./components/TripImageGallery";
import { TripBookingCard } from "./components/TripBookingCard";
import { TripInclusions } from "./components/TripInclusions";
import { TripItinerary } from "./components/TripItinerary";
import { TripFAQ } from "./components/TripFAQ";
import { TripReviews } from "./components/TripReviews";
import { HostCard } from "./components/HostCard";
import { Divider, Chip, Breadcrumbs, Link, Card, CardContent, Typography } from "@mui/material";
import { Star, MapPin, Clock, Users, AlertCircle } from "lucide-react";
import Footer from "../../(landing)/components/Footer/Footer";
import TripSlider from "../../(landing)/components/TripSlider/TripSlider";
// import { useParams } from 'next/navigation'




export default function App() {


  // const { id }  = useParams();



  const tripData = {
    title: "Ultimate 7-Day Bali Adventure & Cultural Experience",
    location: "Bali, Indonesia",
    duration: "7 days",
    maxGuests: 12,
    rating: 4.8,
    totalReviews: 156,
    images: [
      "https://images.unsplash.com/photo-1558117338-aa433feb1c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2Mjc0MzM5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1603741614953-4187ed84cc50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjI3NzM0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1576682953661-a056a5073019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NjI3ODU3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1743699537171-750edd44bd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjB0cmF2ZWwlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYyNzg1NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Embark on an unforgettable journey through the heart of Bali, where ancient temples meet pristine beaches and lush rice terraces. This carefully curated 7-day adventure combines cultural immersion with thrilling outdoor activities, authentic culinary experiences, and moments of pure relaxation. From sunrise treks up Mount Batur to sunset yoga sessions overlooking the Indian Ocean, every day brings new discoveries and memories to last a lifetime.",
    meetingPoint: "Ngurah Rai International Airport (DPS), Bali - Main Terminal Arrival Hall",
    endPoint: "Ngurah Rai International Airport (DPS), Bali - Main Terminal Departure Hall",
    availableDates: [
      { date: new Date(2025, 11, 15), price: 1299, seatsAvailable: 2, totalSeats: 12 },
      { date: new Date(2025, 11, 22), price: 1399, seatsAvailable: 4, totalSeats: 12 },
      { date: new Date(2026, 0, 5), price: 1499, seatsAvailable: 8, totalSeats: 12 },
      { date: new Date(2026, 0, 19), price: 1299, seatsAvailable: 10, totalSeats: 12 },
      { date: new Date(2026, 1, 2), price: 1399, seatsAvailable: 7, totalSeats: 12 },
    ],
    inclusions: [
      "6 nights accommodation in premium hotels and villas",
      "Daily breakfast and 4 traditional Balinese dinners",
      "All transportation during the tour (private AC vehicle)",
      "Professional English-speaking tour guide",
      "Entrance fees to all temples and attractions",
      "Mount Batur sunrise trekking with breakfast",
      "Traditional Balinese cooking class",
      "Daily yoga and meditation sessions",
      "White water rafting adventure",
      "Airport pickup and drop-off",
    ],
    exclusions: [
      "International flights to/from Bali",
      "Travel insurance (highly recommended)",
      "Lunch meals (unless specified)",
      "Personal expenses and shopping",
      "Tips for guides and drivers (optional)",
      "Visa fees (if applicable)",
      "Additional activities not mentioned in itinerary",
      "Alcoholic beverages",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Ubud Welcome",
        description: "Arrive in Bali and transfer to your luxury accommodation in Ubud. Settle in and enjoy a welcome dinner featuring authentic Balinese cuisine.",
        duration: "Evening arrival",
        activities: [
          "Airport pickup and transfer to Ubud (1.5 hours)",
          "Check-in at luxury resort",
          "Welcome orientation and dinner",
        ],
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sacred Temples & Rice Terraces",
        description: "Explore the cultural heart of Bali with visits to ancient temples and the famous Tegalalang Rice Terraces.",
        duration: "Full day (8:00 AM - 6:00 PM)",
        activities: [
          "Visit Tirta Empul Holy Water Temple",
          "Explore Tegalalang Rice Terraces",
          "Coffee plantation tour and tasting",
          "Sunset at Tanah Lot Temple",
        ],
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Mount Batur Sunrise Trek",
        description: "Wake up early for an unforgettable sunrise trek to the summit of Mount Batur volcano, followed by relaxation at hot springs.",
        duration: "2:00 AM - 2:00 PM",
        activities: [
          "Early morning pickup (2:00 AM)",
          "Guided trek to Mount Batur summit",
          "Breakfast cooked by volcanic steam",
          "Relaxation at natural hot springs",
        ],
        meals: ["Breakfast"],
      },
      {
        day: 4,
        title: "Beach Day & Water Sports",
        description: "Head to the stunning beaches of Nusa Dua for a day of water activities and coastal relaxation.",
        duration: "Full day (9:00 AM - 5:00 PM)",
        activities: [
          "White water rafting on Ayung River",
          "Beach time at Nusa Dua",
          "Optional water sports (snorkeling, jet ski)",
          "Sunset beach dinner",
        ],
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 5,
        title: "Balinese Cooking & Culture",
        description: "Immerse yourself in Balinese culture with a traditional cooking class and village visit.",
        duration: "Full day (9:00 AM - 4:00 PM)",
        activities: [
          "Traditional market visit",
          "Balinese cooking class",
          "Lunch with your own creations",
          "Village cultural tour",
          "Traditional dance performance",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 6,
        title: "North Bali Discovery",
        description: "Journey to North Bali to discover waterfalls, Buddhist temples, and stunning mountain scenery.",
        duration: "Full day (8:00 AM - 6:00 PM)",
        activities: [
          "Visit Gitgit Waterfall",
          "Explore Ulun Danu Beratan Temple",
          "Jatiluwih UNESCO Rice Terraces",
          "Scenic mountain drive",
        ],
        meals: ["Breakfast"],
      },
      {
        day: 7,
        title: "Departure Day",
        description: "Enjoy a final yoga session and leisurely breakfast before your transfer to the airport.",
        duration: "Based on flight schedule",
        activities: [
          "Morning yoga and meditation session",
          "Free time for last-minute shopping",
          "Airport transfer",
        ],
        meals: ["Breakfast"],
      },
    ],
    cancellationPolicy: "Free cancellation up to 14 days before the trip start date. Cancellations made 7-14 days before start date will receive 50% refund. Cancellations made within 7 days of start date are non-refundable. We recommend purchasing travel insurance to protect against unforeseen circumstances.",
    faqs: [
      {
        question: "What fitness level is required for this trip?",
        answer: "This trip requires a moderate fitness level. The Mount Batur trek involves about 2 hours of uphill hiking, and there are several days with extended walking. However, most activities can be adjusted to accommodate different fitness levels.",
      },
      {
        question: "What should I pack for this trip?",
        answer: "Pack comfortable walking shoes, hiking boots, light breathable clothing, swimwear, sunscreen, insect repellent, a light rain jacket, and modest clothing for temple visits (covered shoulders and knees). We'll provide a detailed packing list upon booking.",
      },
      {
        question: "Is this trip suitable for solo travelers?",
        answer: "Absolutely! Many of our travelers are solo adventurers. You'll be part of a small group (max 12 people), making it easy to make friends and share experiences. Single room supplements are available.",
      },
      {
        question: "What is the accommodation like?",
        answer: "You'll stay in carefully selected 4-star hotels and boutique villas with modern amenities, swimming pools, and stunning views. All rooms include air conditioning, private bathrooms, and Wi-Fi.",
      },
      {
        question: "Do I need a visa for Indonesia?",
        answer: "Citizens of many countries can obtain a visa on arrival at Bali airport for $35 USD (valid for 30 days). Please check your country's specific requirements before traveling.",
      },
      {
        question: "What if I have dietary restrictions?",
        answer: "We can accommodate most dietary requirements including vegetarian, vegan, gluten-free, and allergies. Please inform us of any restrictions at the time of booking.",
      },
    ],
    host: {
      name: "Sarah Anderson",
      avatar: "https://images.unsplash.com/photo-1595956935400-eced8114c8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBob3N0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyNzg1NzA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      joinedDate: "March 2018",
      responseRate: 98,
      responseTime: "Within 1 hour",
      verified: true,
      rating: 4.9,
      totalReviews: 324,
      description: "Passionate travel enthusiast with 15+ years of experience exploring Southeast Asia. I've been organizing tours in Bali for over 7 years and love sharing the magic of this island with travelers from around the world. My goal is to create authentic, immersive experiences that go beyond typical tourist attractions.",
    },
    reviews: [
      {
        id: "1",
        author: "Michael Chen",
        avatar: "",
        rating: 5,
        date: "October 2024",
        comment: "This trip exceeded all my expectations! Sarah was an incredible guide who truly knows Bali inside and out. The mix of adventure, culture, and relaxation was perfect. The sunrise trek to Mount Batur was the highlight - absolutely breathtaking. Highly recommend!",
      },
      {
        id: "2",
        author: "Emma Rodriguez",
        avatar: "",
        rating: 5,
        date: "September 2024",
        comment: "Amazing experience from start to finish. The accommodations were beautiful, the food was delicious, and our group became like family. The cooking class was so much fun, and I loved learning about Balinese culture. Worth every penny!",
      },
      {
        id: "3",
        author: "David Thompson",
        avatar: "",
        rating: 4,
        date: "August 2024",
        comment: "Great trip overall! Well organized with a good balance of activities. The temples were stunning and the rice terraces were like something from a postcard. Only minor issue was some of the drives were quite long, but that's just the nature of Bali's geography.",
      },
      {
        id: "4",
        author: "Lisa Patel",
        avatar: "",
        rating: 5,
        date: "July 2024",
        comment: "Solo traveler here and this was perfect! Made amazing friends and felt safe the entire time. Sarah's knowledge of local culture and hidden gems made this trip truly special. The yoga sessions each morning set the perfect tone for the day.",
      },
    ]
  };

  const ratingBreakdown = {
    5: 132,
    4: 18,
    3: 4,
    2: 1,
    1: 1,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-20 py-6">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/destinations">
            Destinations
          </Link>
          <Link underline="hover" color="inherit" href="/destinations/bali">
            Bali
          </Link>
          <Typography color="text.primary">Trip Details</Typography>
        </Breadcrumbs>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-8">
            <TripImageGallery images={tripData.images} />

            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chip label="Popular" color="default" />
                    <Chip label="Adventure" variant="outlined" />
                  </div>
                  <h1>{tripData.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span>
                        {tripData.rating} ({tripData.totalReviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-5 w-5" />
                      <span>{tripData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-5 w-5" />
                      <span>{tripData.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-5 w-5" />
                      <span>Max {tripData.maxGuests} guests</span>
                    </div>
                  </div>
                </div>
              </div>

              <Divider sx={{ my: 3 }} />

              <div className="space-y-6">
                <div>
                  <h2 className="font-bold text-2xl">About This Experience</h2>
                  <p className="text-gray-600 mt-2">{tripData.description}</p>
                </div>

                <Card sx={{ bgcolor: 'rgb(239 246 255)', borderColor: 'rgb(191 219 254)' }}>
                  <CardContent>
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Meeting Point:</span> {tripData.meetingPoint}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">End Point:</span> {tripData.endPoint}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Divider />

            <TripInclusions
              inclusions={tripData.inclusions}
              exclusions={tripData.exclusions}
            />

            <Divider />

            <TripItinerary itinerary={tripData.itinerary} />

            <Divider />

            <div className="space-y-4 my-8">
              <h2 className="font-bold text-2xl">Cancellation Policy</h2>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid #ececec',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <p className="text-gray-600">{tripData.cancellationPolicy}</p>
                </CardContent>
              </Card>
            </div>

            <Divider />

            <TripFAQ faqs={tripData.faqs} />

            <Divider />

            <TripReviews
              reviews={tripData.reviews}
              averageRating={tripData.rating}
              totalReviews={tripData.totalReviews}
              ratingBreakdown={ratingBreakdown}
            />

            <Divider />

            <div className="space-y-4 mt-8">
              <h2 className="font-bold text-2xl">Meet Your Host</h2>
              <HostCard {...tripData.host} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <TripBookingCard
              availableDates={tripData.availableDates}
              basePrice={1299}
            />
          </div>
        </div>

        <Divider sx={{ my: 6 }} />

        <TripSlider />
      </div>

      <Footer />
    </div>
  );
}
