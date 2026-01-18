import MyImage from '@/common/ui/Image';
import { IndianRupee } from 'lucide-react';

interface TripCardProps {
  image: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  title: string;
  location: string;
  date: string;
  duration: string;
  host: string;
  price: string;
  paymentStatus?: string;
  bookingStatus?: string;
  hasReview?: boolean;
  isCompleted?: boolean;
  review?: {
    rating: number;
    text: string;
  };
  onEditReview?: () => void;
  onDeleteReview?: () => void;
  onDownloadReceipt?: () => void;
  onAddReview?: () => void;
}

const statusConfig = {
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    label: 'Completed',
  },
  upcoming: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    label: 'Upcoming',
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    label: 'Cancelled',
  },
};

export function TripCard({
  image,
  status,
  title,
  location,
  date,
  duration,
  host,
  price,
  paymentStatus,
  bookingStatus,
  hasReview,
  isCompleted,
  review,
  onEditReview,
  onDeleteReview,
  onDownloadReceipt,
  onAddReview,
}: TripCardProps) {
  // Ensure status is valid, fallback to 'upcoming' if not
  const validStatus = statusConfig[status] ? status : 'upcoming';
  const statusStyle = statusConfig[validStatus];

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden">
      <div className="flex flex-col">
        {/* Image Section */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 flex-shrink-0">
          <MyImage
            src={image}
            alt={title}
            className="w-full h-full"
          />
          <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 ${statusStyle.bg} rounded-lg px-2 sm:px-3 py-1 sm:py-1.5`}>
            <span className={`${statusStyle.text} text-xs font-bold font-['Satoshi'] leading-4`}>
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-neutral-900 text-xl sm:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-9">
                  {title}
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-1.5 text-neutral-700">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.33"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.33"
                      />
                    </svg>
                    <span className="font-medium font-['Satoshi']">{location}</span>
                  </div>
                  <div className='flex gap-4 md:gap-6'>
                    <div className="flex items-center gap-1.5 text-neutral-700">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <rect
                          x="2"
                          y="3"
                          width="12"
                          height="11"
                          stroke="currentColor"
                          strokeWidth="1.33"
                          rx="1"
                        />
                        <path d="M2 7H14" stroke="currentColor" strokeWidth="1.33" />
                      </svg>
                      <span className="font-medium font-['Satoshi']">{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-700">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="currentColor"
                          strokeWidth="1.33"
                        />
                        <path
                          d="M8 4V8H11"
                          stroke="currentColor"
                          strokeWidth="1.33"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="font-medium font-['Satoshi']">{duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                  Hosted by {host}
                </p>
                {/* Payment and Booking Status */}
                {(paymentStatus || bookingStatus) && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold font-['Satoshi'] ${(paymentStatus || 'pending').toLowerCase() === 'completed' ? 'bg-green-100 text-green-700' :
                        (paymentStatus || 'pending').toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          (paymentStatus || 'pending').toLowerCase() === 'failed' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                      }`}>
                      Payment: {paymentStatus || 'pending'}
                    </div>
                    {bookingStatus && (
                      <div className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold font-['Satoshi'] ${bookingStatus.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-700' :
                          bookingStatus.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            bookingStatus.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                              bookingStatus.toLowerCase() === 'failed' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                        }`}>
                        Booking: {bookingStatus}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-neutral-900 text-3xl font-bold font-['Satoshi'] leading-[48px] flex items-center">
                  <IndianRupee size={30} strokeWidth={2.5} /> {price}
                </div>
                <div className="text-neutral-700 text-xs font-medium font-['Satoshi']">
                  Total paid
                </div>
              </div>
            </div>

            {/* Review Section */}
            {review && (
              <div className="bg-neutral-50 rounded-xl border-2 border-gray-200 p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
                      Your Review:
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          viewBox="0 0 16 16"
                          fill={i < review.rating ? '#F59E0B' : 'none'}
                          stroke="#F59E0B"
                          strokeWidth="1.33"
                        >
                          <path d="M8 2L9.5 6.5H14L10.5 9.5L12 14L8 11L4 14L5.5 9.5L2 6.5H6.5L8 2Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={onEditReview}
                      className="flex items-center gap-1 text-neutral-900 text-xs font-bold font-['Satoshi']"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M10 2L12 4L5 11H3V9L10 2Z"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={onDeleteReview}
                      className="flex items-center gap-1 text-red-600 text-xs font-bold font-['Satoshi']"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 4H11M4 4V12H10V4M5 2H9"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                  {review.text}
                </p>
              </div>
            )}
          </div>

          {/* Download Receipt Button */}
          <button
            onClick={onDownloadReceipt}
            className="mt-4 bg-neutral-50 rounded-xl border-2 border-gray-200 py-3 flex items-center justify-center gap-2 text-neutral-900 text-sm font-bold font-['Satoshi'] hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2V10M8 10L5 7M8 10L11 7"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
              />
              <path d="M2 11V13H14V11" stroke="currentColor" strokeWidth="1.33" />
            </svg>
            Download Receipt
          </button>

          {/* Review Action Buttons */}
          {isCompleted && (
            <div className="mt-3 flex gap-2">
              {hasReview ? (
                <button
                  onClick={onEditReview}
                  className="flex-1 bg-neutral-900 text-white rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-bold font-['Satoshi'] hover:bg-neutral-800 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M11 2L14 5L5 14H2V11L11 2Z"
                      stroke="currentColor"
                      strokeWidth="1.33"
                    />
                  </svg>
                  Edit Review
                </button>
              ) : (
                <button
                  onClick={onAddReview}
                  className="flex-1 bg-neutral-900 text-white rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-bold font-['Satoshi'] hover:bg-neutral-800 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 4L10 6L14 2"
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 8V12H4"
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add Review
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
