'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetData } from '@/services/useGetData';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { StarIcon } from '@phosphor-icons/react';
import Button from '@/common/components/atoms/Button';
import ImageInput from '@/common/ui/ImageInput';
import MyImage from '@/common/ui/Image';
import Loader from '@/common/ui/Loader/Loader';

interface ReviewContext {
  tripTitle: string;
  tripImage: string | null;
  destination: string;
  travelDates: string;
  canReview: boolean;
  existingReview: { rating: number; comment: string } | null;
}

const MessageCard = ({ title, message }: { title: string; message: string }) => (
  <div className="flex-1 bg-[#fff9f4] flex flex-col items-center justify-center px-5 gap-2 text-center">
    <h1 className="text-xl font-bold text-black">{title}</h1>
    <p className="text-sm text-[#616161] max-w-md">{message}</p>
  </div>
);

export default function ReviewPage() {
  const params = useParams();
  const token = params.token as string;
  const searchParams = useSearchParams();
  const prefillRating = Number(searchParams.get('rating')) || 0;

  const { data, isLoading, error } = useGetData<ReviewContext>(
    API_ENDPOINTS.REVIEW.BY_TOKEN(token)
  );

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill once the context loads — existing review wins over the email's rating CTA.
  useEffect(() => {
    if (!data) return;
    if (data.existingReview) {
      setRating(data.existingReview.rating);
      setComment(data.existingReview.comment);
    } else if (prefillRating >= 1 && prefillRating <= 5) {
      setRating(prefillRating);
    }
  }, [data, prefillRating]);

  const handleImagesChange = (urls: string[] | File[]) => {
    setImageUrls(urls.filter((url): url is string => typeof url === 'string'));
  };

  const { mutate: submitReview, isPending: isSubmitting, error: submitError } = usePostData({
    url: API_ENDPOINTS.REVIEW.BY_TOKEN(token),
    enableNotifications: false,
    onSuccess: () => setSubmitted(true),
  });

  if (!token) {
    return <MessageCard title="Invalid Review Link" message="This review link is missing required information." />;
  }

  if (isLoading) {
    return (
      <div className="flex-1 bg-[#fff9f4]">
        <Loader />
      </div>
    );
  }

  if (error || !data) {
    return (
      <MessageCard
        title="Review Link Expired"
        message={error?.message || 'This review link is invalid or has expired. Please contact support if you still want to leave a review.'}
      />
    );
  }

  if (!data.canReview) {
    return (
      <MessageCard
        title="Not Available Yet"
        message="This trip isn't marked as completed yet, so reviews aren't open. Please check back soon."
      />
    );
  }

  if (submitted) {
    return (
      <MessageCard
        title="Thanks for your review!"
        message={`Your feedback on ${data.tripTitle} has been submitted.`}
      />
    );
  }

  const isValid = rating > 0 && comment.trim().length > 0;
  const isEdit = !!data.existingReview;

  return (
    <div className="flex-1 bg-[#fff9f4] flex items-start justify-center px-5 pt-[52px] pb-6 md:pt-[76px] md:pb-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
      {/* Trip details */}
      <div className="md:w-[38%] flex flex-col items-center text-center md:items-start md:text-left">
        {data.tripImage && (
          <div className="relative w-full h-36 md:h-64 rounded-2xl overflow-hidden mb-4">
            <MyImage src={data.tripImage} alt={data.tripTitle} className="w-full h-full" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold text-black">{data.tripTitle}</p>
          {data.destination && <p className="text-sm text-[#616161]">{data.destination}</p>}
          {data.travelDates && <p className="text-xs text-[#9c9c9c]">{data.travelDates}</p>}
        </div>
      </div>

      {/* Review form */}
      <div className="w-full md:flex-1 flex flex-col gap-3 max-w-[480px] mx-auto md:mx-0">
        <h1 className="text-xl font-bold text-black">{isEdit ? 'Edit Your Review' : 'How Was Your Trip?'}</h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-black">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <StarIcon
                  size={28}
                  weight={star <= (hoveredRating || rating) ? 'fill' : 'thin'}
                  className={star <= (hoveredRating || rating) ? 'text-yellow-400' : ''}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-black">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience... What did you enjoy most? Would you recommend this trip?"
            rows={3}
            maxLength={2000}
            className="w-full px-3 py-3 rounded-xl border border-zinc-300 text-sm text-black placeholder-black/40 outline-none focus:border-neutral-900 resize-none"
          />
          <span className="text-xs text-[#9c9c9c] -mt-1">{comment.length}/2000</span>
        </div>

        <ImageInput text="Share us your memories !" onImagesChange={handleImagesChange} autoUpload />

        {submitError && (
          <p className="text-sm text-red-500">{submitError.message}</p>
        )}

        <Button
          onClick={() => submitReview({ rating, comment: comment.trim(), images: imageUrls })}
          variant="contained"
          fullWidth
          disabled={!isValid || isSubmitting}
          className="py-3! bg-[#EEA0FF]! text-black!"
          style={{ opacity: isValid && !isSubmitting ? 1 : 0.4 }}
        >
          {isSubmitting ? 'Submitting…' : isEdit ? 'Update Review' : 'Submit Review'}
        </Button>
      </div>
    </div>
    </div>
  );
}
