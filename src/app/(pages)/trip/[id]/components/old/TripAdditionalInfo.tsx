import { TripAdditionalInfoProps } from '../../types';

export function TripAdditionalInfo({ info }: TripAdditionalInfoProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 my-6 sm:my-8">
      <h2 className="text-lg sm:text-xl font-bold text-[#0F172B] tracking-tight">Additional Info</h2>
      <p className="text-sm sm:text-base text-[#334155] leading-5 sm:leading-6">
        {info}
      </p>
    </div>
  );
}