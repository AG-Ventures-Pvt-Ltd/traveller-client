// import { Star } from "lucide-react";
import { Check } from "lucide-react";
import { HostProfile } from "../../types";
import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useParams } from "next/navigation";
import Image from "next/image";

  
export function HostProfileCard() {
  const params = useParams();
  const id = params.id as string;
  
  const { data: fetchedHost, isLoading, error } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id));

  const hostData = fetchedHost;

  if (isLoading) {
    return <div className="w-full p-6 sm:p-8 lg:p-12 bg-neutral-50 rounded-2xl sm:rounded-3xl border-2 border-gray-200 flex items-center justify-center">Loading...</div>;
  }

  if (error || !hostData) {
    throw Error(error?.message)
  }

  return (
    <div className="w-full p-6 sm:p-8 lg:p-12 bg-neutral-50 rounded-2xl sm:rounded-3xl border-2 border-gray-200 flex flex-col gap-0">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {hostData.avatar ? (
          <Image src={hostData.avatar} width={112} height={112} alt={hostData.fullName} className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover flex-shrink-0 mx-auto sm:mx-0" />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
            <span className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold font-['Satoshi']">
              {hostData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex flex-col gap-2">
            <h1 className="text-neutral-900 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-['Satoshi'] leading-tight lg:leading-[50.40px]">
              {hostData.fullName} <Check className="inline w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500 ml-1 sm:ml-2" />
            </h1>
            <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
              Operating Since • {new Date().getFullYear() - parseInt(hostData.yearsOfExperience)}
            </p>
          </div>
          <p className="max-w-[800px] text-neutral-900 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6">
            {hostData.bio}
          </p>

          {/* <div className="grid grid-cols-4 gap-8">
            <StatItem
              value={hostData.stats.yearsWithPlatform.toString()}
              label="Years with Wondrr"
            />
            <StatItem
              value={hostData.stats.successfulTrips.toLocaleString()}
              label="Successful Trips"
            />
            <StatItem
              value={hostData.stats.happyGuests.toLocaleString()}
              label="Happy Guests"
            />
            <StatItem
              value={hostData.rating.toString()}
              label={`Overall Rating (${hostData.reviewCount} reviews)`}
              showStar
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

// interface StatItemProps {
//   value: string;
//   label: string;
//   showStar?: boolean;
// }

// function StatItem({ value, label, showStar }: StatItemProps) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <div className="flex items-center gap-2">
//         {showStar && (
//           <div className="w-7 h-7 bg-neutral-900 rounded-full flex items-center justify-center">
//             <Star className="w-4 h-4 fill-white text-white" />
//           </div>
//         )}
//         <span className="text-neutral-900 text-3xl font-bold font-['Satoshi']">
//           {value}
//         </span>
//       </div>
//       <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
//         {label}
//       </span>
//     </div>
//   );
// }
