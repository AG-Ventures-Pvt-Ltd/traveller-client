


export function HostSkeleton() {
  return (
    <div className="w-[90%] sm:w-96 mx-auto px-4 sm:p-6 lg:p-8 bg-neutral-50 rounded-3xl outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col gap-4 sm:gap-6 animate-pulse">
      {/* Mobile Layout */}
      <div className="grid grid-cols-2 gap-4 sm:hidden items-center justify-between">
        {/* Left Column - Avatar & Name */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-8"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 sm:hidden" />

      {/* Mobile - Based In */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
      </div>

      <div className="h-px bg-gray-200 sm:hidden" />

      {/* Mobile - About */}
      <div className="flex flex-col gap-2 sm:hidden">
        <div className="h-4 bg-gray-300 rounded w-12"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex sm:flex-col sm:gap-4">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Based In */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-300 rounded w-20"></div>
          <div className="h-5 bg-gray-300 rounded w-32"></div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* About */}
        <div className="flex flex-col gap-2">
          <div className="h-5 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Statistics */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}