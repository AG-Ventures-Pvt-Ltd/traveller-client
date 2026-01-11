"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/common/ui/BackButton";
import { HostProfileCard } from "./components/HostProfileCard";
import { AchievementCard } from "./components/AchievementCard";
import { PerformanceMetric } from "./components/PerformanceMetric";
import { TripCard } from "./components/TripCard";
import { RatingOverview } from "./components/RatingOverview";
import { ReviewCard } from "./components/ReviewCard";
import {
  MOCK_HOST_PROFILE,
  ACHIEVEMENTS,
  PERFORMANCE_METRICS,
  MOCK_TRIPS,
  TABS,
  RATING_DISTRIBUTION,
  MOCK_REVIEWS,
} from "./constants";
import { TabType } from "./types";

export default function HostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("trips");

  const handleViewDetails = (tripId: string) => {
    router.push(`/trip/${tripId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-9 py-12">
        <div className="mb-12">
          <BackButton />
        </div>
        <div className="mb-12">
          <HostProfileCard host={MOCK_HOST_PROFILE} />
        </div>
        <div className="mb-12">
          <h2 className="text-neutral-900 text-3xl font-bold font-['Satoshi'] mb-6">
            Achievements & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <div className="px-9 pt-9 pb-6 bg-white rounded-3xl border-2 border-gray-200">
            <h2 className="text-neutral-900 text-3xl font-bold font-['Satoshi'] mb-7">
              Host Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PERFORMANCE_METRICS.map((metric) => (
                <PerformanceMetric key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        </div>
        <div className="mb-8 border-b-2 border-gray-200">
          <div className="flex gap-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 pb-3 relative ${
                  activeTab === tab.id
                    ? "text-neutral-900"
                    : "text-neutral-700"
                }`}
              >
                <span className="text-lg font-bold font-['Satoshi']">
                  {tab.label} ({tab.count})
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                )}
              </button>
            ))}
          </div>
        </div>
        {activeTab === "trips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_TRIPS.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-8">
            <RatingOverview
              overallRating={MOCK_HOST_PROFILE.rating}
              totalReviews={MOCK_HOST_PROFILE.reviewCount}
              distribution={RATING_DISTRIBUTION}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
