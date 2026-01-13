"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/common/ui/BackButton";
import { HostProfileCard } from "./components/HostProfileCard/HostProfileCard";
import { HostTrips } from "./components/HostTrips/HostTrips";
import { HostReviews } from "./components/HostReviews/HostReviews";
import Button from "@/common/ui/Buttons/Button";
import { TabType } from "./types";

interface Tab {
  id: TabType;
  label: string;
  count: number;
}

export default function HostPage() {

  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>("trips");
  const [tripsCount, setTripsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  const handleTripsDataLoaded = (count: number) => {
    setTripsCount(count);
  };

  const handleReviewsDataLoaded = (count: number) => {
    setReviewsCount(count);
  };

  const TABS: Tab[] = [
    { id: "trips", label: "Trips", count: tripsCount },
    { id: "reviews", label: "Reviews", count: reviewsCount },
  ];

  return (
    <div className="min-h-screen bg-white mx-4 sm:mx-6 lg:mx-[6%]">
      <div className="mx-auto px-4 sm:px-6 lg:px-9 py-3 sm:py-4">
        <div className="mb-4 sm:mb-6">
          <BackButton />
        </div>
        <div className="mb-8 sm:mb-12">
          <HostProfileCard />
        </div>
        {/* <div className="mb-12">
          <h2 className="text-neutral-900 text-3xl font-bold font-['Satoshi'] mb-6">
            Achievements & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div> */}
        {/* <div className="mb-12">
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
        </div> */}
        <div className="mb-6 sm:mb-8 border-b-2 border-gray-200">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <div key={tab.id} className="relative flex-shrink-0">
                <Button
                  variant={"text"}
                  color="primary"
                  onClick={() => setActiveTab(tab.id)}
                  className={`!text-lg sm:!text-xl !font-bold !font-['Satoshi'] whitespace-nowrap ${
                    activeTab === tab.id ? "!text-neutral-900" : "!text-neutral-700"
                  }`}
                >
                  {tab.label} ({tab.count})
                </Button>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                )}
              </div>
            ))}
          </div>
        </div>
        {activeTab === "trips" && (
          <HostTrips hostUsername={id} onDataLoaded={handleTripsDataLoaded} />
        )}
        {activeTab === "reviews" && (
          <HostReviews hostUsername={id} onDataLoaded={handleReviewsDataLoaded} />
        )}
      </div>
    </div>
  );
}
