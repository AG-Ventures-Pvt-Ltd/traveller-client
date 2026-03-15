export function HostTripsSkeleton() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Heading Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-0.5 h-8 sm:h-9 bg-gray-300 rounded-full flex-shrink-0" />
          <div className="h-8 sm:h-10 bg-gray-300 rounded w-48"></div>
        </div>

        {/* Filters Section */}
        <div className="mt-4 flex flex-col gap-3 sm:mt-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-300 rounded-3xl w-20 sm:w-32"></div>
            ))}
          </div>
          <div className="w-full sm:w-56 md:w-64 h-10 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Trip Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 mr-[10%]">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* Trip Card Image */}
            <div className="h-40 sm:h-48 bg-gray-300 rounded-lg w-full"></div>
            
            {/* Trip Card Content */}
            <div className="flex flex-col gap-2 px-2">
              {/* Title */}
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              
              {/* Location & Rating */}
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
              
              {/* Price */}
              <div className="h-5 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
