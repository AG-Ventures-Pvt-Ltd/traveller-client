import { TripAdditionalInfoProps } from '../types';

export function TripAdditionalInfo({ info }: TripAdditionalInfoProps) {
  return (
    <div className="flex flex-col gap-4 my-8">
      <h2 className="text-xl font-bold text-[#0F172B] tracking-tight">Additional Info</h2>
      <p className="text-base text-[#334155] leading-6">
        {info}
      </p>
    </div>
  );
}