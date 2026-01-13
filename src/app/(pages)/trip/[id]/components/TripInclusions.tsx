import { Check, X } from "lucide-react";
import { TripInclusionsProps } from '../types';

export function TripInclusions({ inclusions, exclusions }: TripInclusionsProps) {
  const validInclusions = Array.isArray(inclusions) ? inclusions : [];
  const validExclusions = Array.isArray(exclusions) ? exclusions : [];

  return (
    <>
      <p className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">What&apos;s Included & Excluded</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div className="space-y-3 sm:space-y-4 bg-white rounded-2xl">
          <h3 className="font-bold text-base sm:text-lg">Included</h3>
          <ul className="space-y-2 sm:space-y-3">
            {validInclusions.length > 0 ? (
              validInclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="rounded-full p-1 flex-shrink-0">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-600">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-sm sm:text-base text-gray-500">No inclusions specified</li>
            )}
          </ul>
        </div>
        <div className="space-y-3 sm:space-y-4 bg-white rounded-2xl">
          <h3 className="font-bold text-base sm:text-lg">Excluded</h3>
          <ul className="space-y-2 sm:space-y-3">
            {validExclusions.length > 0 ? (
              validExclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="text-black rounded-full p-1 flex-shrink-0">
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-600">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-sm sm:text-base text-gray-500">No exclusions specified</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
