import { Check, X } from "lucide-react";

interface TripInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export function TripInclusions({ inclusions, exclusions }: TripInclusionsProps) {
  const validInclusions = Array.isArray(inclusions) ? inclusions : [];
  const validExclusions = Array.isArray(exclusions) ? exclusions : [];

  return (
    <div className="grid md:grid-cols-2 gap-8 my-8">
      <div className="space-y-4">
        <h3 className="font-bold text-2xl">What&apos;s Included</h3>
        <ul className="space-y-3">
          {validInclusions.length > 0 ? (
            validInclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-1 flex-shrink-0">
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
      <div className="space-y-4">
        <h3 className="font-bold text-2xl">What&apos;s Not Included</h3>
        <ul className="space-y-3">
          {validExclusions.length > 0 ? (
            validExclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-red-100 text-red-600 rounded-full p-1 flex-shrink-0">
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
  );
}
