interface FilterOption {
  label: string;
  count: number;
  active?: boolean;
}

interface TripFilterButtonsProps {
  filters: FilterOption[];
  onFilterChange?: (index: number) => void;
}

export function TripFilterButtons({ filters, onFilterChange }: TripFilterButtonsProps) {
  return (
    <div className="flex gap-3">
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => onFilterChange?.(index)}
          className={`px-5 py-2.5 rounded-xl ${
            filter.active
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-50 text-neutral-700'
          } text-sm font-bold font-['Satoshi'] leading-5`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}
