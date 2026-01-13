import MyImage from '@/common/ui/Image';

interface ReviewCardProps {
  image: string;
  title: string;
  rating: number;
  date: string;
  reviewText: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ReviewCard({
  image,
  title,
  rating,
  date,
  reviewText,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  return (
    <div className="w-full bg-white rounded-3xl border-2 border-gray-200 p-8">
      <div className="flex gap-6">
        {/* Image */}
        <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
          <MyImage 
            src={image} 
            alt={title} 
            width={120}
            height={120}
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-neutral-900 text-xl font-bold font-['Satoshi'] leading-8">
                {title}
              </h3>
              <div className="flex items-center gap-3">
                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      viewBox="0 0 16 16"
                      fill={i < rating ? '#F59E0B' : 'none'}
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                    >
                      <path d="M8 2L9.5 6.5H14L10.5 9.5L12 14L8 11L4 14L5.5 9.5L2 6.5H6.5L8 2Z" />
                    </svg>
                  ))}
                </div>
                {/* Date */}
                <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                  {date}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-neutral-50 rounded-xl border-2 border-gray-200 flex items-center gap-1.5 hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M10 2L12 4L5 11H3V9L10 2Z"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                <span className="text-neutral-900 text-xs font-bold font-['Satoshi']">
                  Edit
                </span>
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-neutral-50 rounded-xl border-2 border-gray-200 flex items-center gap-1.5 hover:bg-red-50 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 4H11M4 4V12H10V4M5 2H9"
                    stroke="#DC2626"
                    strokeWidth="1"
                  />
                </svg>
                <span className="text-red-600 text-xs font-bold font-['Satoshi']">
                  Delete
                </span>
              </button>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-5">
            {reviewText}
          </p>
        </div>
      </div>
    </div>
  );
}
