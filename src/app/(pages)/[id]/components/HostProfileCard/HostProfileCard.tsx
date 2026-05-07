import { Star } from "lucide-react";
import { useEffect } from "react";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useParams } from "next/navigation";
import { useGetData } from "@/services/useGetData";
import { HostProfile } from "../../types";
import { HostSkeleton } from "./components/HostSkeleton";
import Card from "@/common/ui/Card";
// import { calculateYearsFromDate } from "@/common/utils/dateUtils";
import HostAvatar from "./components/HostAvatar";
import { useHostStore } from "../../store/hostStore";


// const PERFORMANCE = [
//   { icon: MessageCircle, value: "98% Response Rate", description: "Replies quickly" },
//   { icon: Clock, value: "< 1 hour", description: "Response time" },
//   { icon: CheckCircle, value: "99% Confirmation", description: "Accepts most bookings" },
// ];

// const BADGES = [
//   { icon: Star, label: "Top Rated Host" },
//   { icon: ShieldCheck, label: "Verified Operator" },
//   { icon: Trophy, label: "Superhost 2024" },
//   { icon: Zap, label: "Quick Responder" },
// ];



export default function HostProfileCard() {

    const params = useParams();
    const id = params.id as string;
    const setHostData = useHostStore((state) => state.setHostData);

    const { data: fetchedHost, isLoading, error } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id));

    // Store host data in Zustand when fetched
    useEffect(() => {
        if (fetchedHost?.fullName) {
            setHostData(id, fetchedHost.fullName);
        }
    }, [fetchedHost?.fullName, id, setHostData]);

    if (isLoading) {
        return <HostSkeleton />;
    }

    if (error || !fetchedHost) {
        throw Error(error?.message)
    }

    // const yearsWithPlatform = fetchedHost.createdAt ? calculateYearsFromDate(fetchedHost.createdAt) : 0;

    const STATS = [
        { label: "Total Trips", value: fetchedHost.totalTrips?.toString() || "0" },
        { label: "Upcoming Batches", value: fetchedHost.upcomingBatches?.toString() || "0" },
        { label: "Overall Rating", value: fetchedHost.rating?.toString() || "0", icon: Star, isRating: true },
        { label: "Total Reviews", value: fetchedHost.totalReviews?.toString() || "0", isReview: true },
    ];

    const location = fetchedHost.city || fetchedHost.state ? `${fetchedHost.city || ''}${fetchedHost.city && fetchedHost.state ? ', ' : ''}${fetchedHost.state || ''}` : '';

    return (
        <Card variant="fill" className="flex flex-col p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 w-[90%] sm:w-96 mx-auto">
            <div className="grid grid-cols-2 gap-4 sm:hidden items-center justify-between">
                <div className="flex flex-col items-center  gap-3 text-center">
                    <HostAvatar avatar={fetchedHost.avatar} fullName={fetchedHost.fullName} />
                    <div className="flex flex-col items-center  gap-1">
                        <h2 className="text-neutral-900 text-base font-bold  leading-6">{fetchedHost.fullName}</h2>
                        <p className="text-neutral-900 text-xs font-bold ">{fetchedHost.yearsOfExperience} yrs exp</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        {STATS.map(({ label, value, icon: Icon, isRating, isReview }) => {
                            const showNewChip = (isRating || isReview) && value === "0";
                            return (
                                <div key={label} className="flex items-center gap-6">
                                    <span className="text-neutral-700 text-xs font-medium ">{label}</span>
                                    <div className="flex items-center gap-1">
                                        {Icon && !showNewChip && <Icon className="w-3 h-3 text-neutral-900" fill="currentColor" strokeWidth={0} />}
                                        {showNewChip ? (
                                            <span className="bg-neutral-800 text-white px-2 py-0.5 rounded-full text-xs font-bold ">New</span>
                                        ) : (
                                            <span className="text-neutral-900 text-sm font-bold">{value}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            

            {location !== '' &&
                (
                    <div className="sm:hidden">
                        <div className="h-px bg-gray-200 sm:hidden mb-4" />
                        <div className="flex items-center justify-between w-full">
                            <h3 className="text-neutral-900 text-sm font-bold ">Based In</h3>
                            <span className="text-neutral-600 text-sm font-medium ">
                                {location}
                            </span>
                        </div>
                    </div>
                )}

            <div className="h-px bg-gray-200 sm:hidden" />

            <div className="flex flex-col gap-2 sm:hidden">
                <h3 className="text-neutral-900 text-sm font-bold ">About</h3>
                <p className="text-neutral-700 text-xs font-medium  leading-5">{fetchedHost.bio}</p>
            </div>

            <div className="hidden sm:flex sm:flex-col sm:gap-4">
                <div className="flex flex-col items-center gap-5">
                    <HostAvatar avatar={fetchedHost.avatar} fullName={fetchedHost.fullName} />
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h2 className="text-neutral-900 text-2xl lg:text-3xl font-bold  leading-8">{fetchedHost.fullName}</h2>
                        <p className="text-neutral-900 text-sm font-bold ">{fetchedHost.yearsOfExperience} yrs exp</p>

                    </div>
                </div>
                {location !== '' &&
                    (
                        <div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex items-center justify-between mt-4 w-full">
                                <h3 className="text-neutral-900 text-base font-bold ">Based In</h3>
                                <span className="text-neutral-600 text-base font-medium ">
                                    {location}
                                </span>
                            </div>
                        </div>
                    )}
                <div className="h-px bg-gray-200" />

                <div className="flex flex-col gap-2">
                    <h3 className="text-neutral-900 text-base font-bold ">About</h3>
                    <p className="text-neutral-700 text-sm font-medium  leading-5">{fetchedHost.bio}</p>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        {STATS.map(({ label, value, icon: Icon, isRating, isReview }) => {
                            const showNewChip = (isRating || isReview) && value === "0";
                            return (
                                <div key={label} className="flex justify-between items-center gap-3">
                                    <span className="text-neutral-700 text-sm font-medium ">{label}</span>
                                    <div className="flex items-center gap-1">
                                        {Icon && !showNewChip && <Icon className="w-4 h-4 text-neutral-900" fill="currentColor" strokeWidth={0} />}
                                        {showNewChip ? (
                                            <span className="bg-neutral-800 text-white px-3 py-1 rounded-full text-sm font-bold ">New</span>
                                        ) : (
                                            <span className="text-neutral-900 text-xl font-bold ">{value}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
}
