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
import Footer from "../../(landing)/Footer/Footer";
import TripSlider from "../../(landing)/TripSlider/TripSlider";
import { useParams, useRouter } from 'next/navigation';
import { useTripBasicDetails, useTripDetailedDetails } from '../api';
import { useState, useEffect, useMemo } from 'react';
import Logo from "@/common/components/atoms/Logo/Logo";
import { generateSlug } from '../utils';
import { ratingBreakdown } from '../constants';
import Loader from "@/common/ui/Loader/Loader";



export default function TripDetail() {

  const params = useParams();
  const slugParam = params.id;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const router = useRouter();
  const id = slug ? (slug.split('-').pop() || slug) : '';
  const [loadDetailed, setLoadDetailed] = useState(false);

  const { data: basicData, isLoading: isBasicLoading } = useTripBasicDetails(id as string);
  const { data: detailedData } = useTripDetailedDetails(id as string, loadDetailed);

  useEffect(() => {
    if (basicData && !loadDetailed) {
      setLoadDetailed(true);
    }
  }, [basicData, loadDetailed]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tripData = useMemo(() => basicData ? { ...basicData, ...(detailedData || {}) } as any : null, [basicData, detailedData]);

  useEffect(() => {
    if (tripData && tripData.title && slug) {
      const generatedSlug = generateSlug(tripData.title, id);
      if (slug !== generatedSlug) {
        router.replace(`/trip/${generatedSlug}`);
      }
    }
  }, [tripData, slug, router, id]);


  if (isBasicLoading || !tripData) return <Loader/>;

   const MOCK_TRIPS = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'Manali Adventure Trek',
        rating: 4.5,
        location: 'Manali, Himachal Pradesh',
        price: 6000,
        reviewCount: 23,
        days : 1
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
        title: 'Coorg Coffee Plantation Tour Lets',
        rating: 4.8,
        location: 'Coorg, Karnataka',
        price: 8500,
        reviewCount: 45,
        days : 4
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
        title: 'Goa Beach Paradise',
        rating: 4.6,
        location: 'Goa',
        price: 7200,
        reviewCount: 67,
        days : 5
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=800&h=600&fit=crop',
        title: 'Kerala Backwaters',
        rating: 4.9,
        location: 'Alleppey, Kerala',
        price: 9500,
        reviewCount: 89,
        days : 4
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
        title: 'Rajasthan Heritage Tour',
        rating: 4.7,
        location: 'Jaipur, Rajasthan',
        price: 11000,
        reviewCount: 34,
        days : 4
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
        title: 'Shimla Hill Station',
        rating: 4.4,
        location: 'Shimla, Himachal Pradesh',
        price: 6500,
        reviewCount: 56,
        days : 3
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
        title: 'Mysore Palace Experience',
        rating: 4.6,
        location: 'Mysore, Karnataka',
        price: 5800,
        reviewCount: 41,
        days : 5
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop',
        title: 'Darjeeling Tea Gardens',
        rating: 4.8,
        location: 'Darjeeling, West Bengal',
        price: 8900,
        reviewCount: 72,
        days : 3
    }
]

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col mx-20 py-6">
        <Logo className="mb-2" />
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} separator=">">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/destinations">
            Destinations
          </Link>
          <Link underline="hover" color="inherit" href={`/trips/?destination=${typeof tripData.location === 'object' ? tripData.location.city.toLowerCase() : ''}`}>
            {typeof tripData.location === 'object' ? tripData.location.city : ''}
          </Link>
          <Typography color="text.primary">Trip Details</Typography>
        </Breadcrumbs>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-8">
            <TripImageGallery images={tripData.images || []} />

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
                      <span>{typeof tripData.location === 'object' ? tripData.location.address : tripData.location}</span>
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
              {tripData.host ? (
                <HostCard {...tripData.host} />
              ) : (
                <div className="text-gray-500 text-center py-8">
                  Host information is not available yet.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <TripBookingCard
              availableDates={tripData.availableDates}
              basePrice={tripData.basePrice}
            />
          </div>
        </div>

        <Divider sx={{ my: 6 }} />

        <TripSlider title="Similar Travel Options Just for You" trips={MOCK_TRIPS}/>
      </div>

      <Footer />
    </div>
  );
}
