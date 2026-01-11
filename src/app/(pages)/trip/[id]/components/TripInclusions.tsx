import { Check, X } from "lucide-react";
import { TripInclusionsProps } from '../types';

export function TripInclusions({ inclusions, exclusions }: TripInclusionsProps) {
  const validInclusions = Array.isArray(inclusions) ? inclusions : [];
  const validExclusions = Array.isArray(exclusions) ? exclusions : [];

  return (
    <>
      <p className="font-bold text-xl mb-4">What&apos;s Included & Excluded</p>
      <div className="grid md:grid-cols-2 gap-8 ">
        <div className="space-y-4 bg-white rounded-2xl">
          <h3 className="font-bold">Included</h3>
          <ul className="space-y-3">
            {validInclusions.length > 0 ? (
              validInclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="rounded-full p-1 flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No inclusions specified</li>
            )}
          </ul>
        </div>
        <div className="space-y-4 bg-white rounded-2xl">
          <h3 className="font-bold">Excluded</h3>
          <ul className="space-y-3">
            {validExclusions.length > 0 ? (
              validExclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="text-black rounded-full p-1 flex-shrink-0">
                    <X className="h-4 w-4" />
                  </div>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No exclusions specified</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
