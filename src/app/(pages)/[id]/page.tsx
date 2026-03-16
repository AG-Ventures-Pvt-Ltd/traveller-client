"use client";

import { useParams } from "next/navigation";
import BackButton from "@/common/ui/BackButton";
import { HostTrips } from "./components/HostTrips/HostTrips";
import { HostReviews } from "./components/HostReviews/HostReviews";
import HostProfileCard from "./components/HostProfileCard/HostProfileCard";


export default function HostPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="min-h-screen bg-white px-3 sm:px-6">
      <div className="mx-auto sm:mx-[5%] w-full py-3 sm:py-4 lg:px-4">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="w-full md:w-auto md:shrink-0 md:sticky md:top-[14%]">
            <HostProfileCard />
          </div>
          <div className="w-full min-w-0 flex-1">
            <HostTrips hostUsername={id} />
          </div>
        </div>
        <div className="mt-6 sm:mt-8">
          <HostReviews hostUsername={id} />
        </div>
      </div>
    </div>
  );
}
