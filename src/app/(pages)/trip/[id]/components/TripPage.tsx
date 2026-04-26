'use client'

import { TripImageGallery } from "./old/TripImageGallery";
import { TripBookingCard } from "./old/TripBookingCard";
import { TripInclusions } from "./old/TripInclusions";
import { TripItinerary } from "./old/TripItinerary";
import { TripFAQ } from "./old/TripFAQ";
import { TripReviews } from "./old/TripReviews";
import { HostCard } from "./old/HostCard";
import { TripPolicies } from "./old/TripPolicies";
import { TripAdditionalInfo } from "./old/TripAdditionalInfo";
import MobileBookingBar from "./old/MobileBookingBar";
import TripDetailMobile from "./mobile/TripDetailMobile";
import { Separator } from "@/common/ui/separator";
import Footer from "../../../(landing)/Footer/Footer";
import { useParams, useRouter } from 'next/navigation';
import { useTripBasicDetails, useTripDetailedDetails } from '../../api';
import { useState, useEffect, useMemo } from 'react';
import { generateSlug } from '../../utils';
import { ratingBreakdown } from '../../constants';
import Loader from "@/common/ui/Loader/Loader";
import { TripData } from '../types';
import Card from "@/common/ui/Card";
import BackButton from "@/common/ui/BackButton";
import { useDeviceContext } from "@/common/context/DeviceContext";


export default function TripDetail() {

  const params = useParams();
  const slugParam = params.id;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const router = useRouter();
  const id = slug ? (slug.split('-').pop() || slug) : '';
  const [loadDetailed, setLoadDetailed] = useState(false);
  const { isMobile } = useDeviceContext();

  const { data: basicData, isLoading: isBasicLoading, error } = useTripBasicDetails(id as string);
  const { data: detailedData } = useTripDetailedDetails(id as string, loadDetailed);

  useEffect(() => {
    if (basicData && !loadDetailed) {
      setLoadDetailed(true);
    }
  }, [basicData, loadDetailed]);

  const tripData = useMemo(() => basicData ? { ...basicData, ...(detailedData || {}) } as TripData : null, [basicData, detailedData]);

  useEffect(() => {
    if (tripData && tripData.title && slug) {
      const generatedSlug = generateSlug(tripData.title, id);
      if (slug !== generatedSlug) {
        router.replace(`/trip/${generatedSlug}`);
      }
    }
  }, [tripData, slug, router, id]);

  if (isBasicLoading || !tripData) return <Loader />;

  if (error) {
    throw Error(error.message)
  }

  if (isMobile) {
    return <TripDetailMobile />;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col mx-4 sm:mx-8 md:mx-8 xl:mx-20 py-4">
        <BackButton className="mb-3" />
        <div className="space-y-2 flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 font-medium">{tripData.title}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="lg:col-span-3 space-y-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {tripData.tags?.map((item) => <Card key={item} variant='fill' className="rounded-full px-3 py-1 md:px-3.5 md:py-1.5 font-medium text-xs md:text-sm border!">{item}</Card>)}
            </div>
            <TripImageGallery images={tripData.images || []} />
            <div>
              <div className="flex items-start justify-between mb-4">
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">Overview</h2>
                  <p className="mt-2 text-sm sm:text-base font-medium">{tripData.description}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg sm:text-xl">
                    Location
                  </p>
                  <p className="text-sm sm:text-base">
                    {tripData.location}
                  </p>
                </div>
              </div>
            </div>
            <Separator className="my-4 sm:my-6" />
            <TripItinerary itinerary={tripData.itinerary || []} />
            <Separator className="my-4 sm:my-6" />
            <TripInclusions
              inclusions={tripData.inclusions || []}
              exclusions={tripData.exclusions || []}
            />
            <Separator className="my-4 sm:my-6" />
            <div className="space-y-4 mt-6 sm:mt-8">
              {tripData.host && (
                <HostCard {...tripData.host} />
              )}
            </div>
            <Separator className="my-4 sm:my-6" />
            <TripReviews
              reviews={tripData.reviews || []}
              averageRating={tripData.rating || 0}
              totalReviews={tripData.totalReviews || 0}
              ratingBreakdown={ratingBreakdown}
            />
            <Separator className="my-4 sm:my-6" />
            <TripPolicies
              cancellationRules={tripData.cancellationRules}
              refundTerms={tripData.refundTerms}
              refundProcessingTime={tripData.refundProcessingTime}
            />
            <Separator className="my-4 sm:my-6" />
            {tripData.additionalInfo && <TripAdditionalInfo info={tripData.additionalInfo} />}
            <Separator className="my-4 sm:my-6" />
            <TripFAQ faqs={tripData.faqs || []} />
          </div>
          <div className="hidden lg:block lg:col-span-1">
            <TripBookingCard
              availableDates={tripData.tripBatches || []}
              basePrice={tripData.basePrice || 0}
              category={tripData.category}
              tripSlug={id}
              isBookmarked={tripData.isBookmarked || false}
            />
          </div>
        </div>
      </div>
      <MobileBookingBar tripData={tripData} tripId={id} />
      {/* <div className="px-[5%] my-[5%]">
        <FeaturedDestinations />
      </div> */}
      <Footer />
    </div>
  );
}
