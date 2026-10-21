'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetData } from '@/services/useGetData';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import Button from '@/common/components/atoms/Button';
import Loader from '@/common/ui/Loader/Loader';

interface ReviewContext {
  tripTitle: string;
  tripImage: string | null;
  destination: string;
  travelDates: string;
  canReview: boolean;
  existingReview: { rating: number; comment: string } | null;
}

const ErrorCard = ({ title, message }: { title: string; message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4">
    <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
      <h1 className="text-2xl font-bold text-foreground mb-4">{title}</h1>
      <p className="text-muted-foreground">{message}</p>
    </div>
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

  const { mutate: submitReview, isPending: isSubmitting, error: submitError } = usePostData({
    url: API_ENDPOINTS.REVIEW.BY_TOKEN(token),
    enableNotifications: false,
    onSuccess: () => setSubmitted(true),
  });

  if (!token) {
    return <ErrorCard title="Invalid Review Link" message="This review link is missing required information." />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader />
        <p className="mt-4 text-muted-foreground">Loading your trip…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorCard
        title="Review Link Expired"
        message={error?.message || 'This review link is invalid or has expired. Please contact support if you still want to leave a review.'}
      />
    );
  }

  if (!data.canReview) {
    return (
      <ErrorCard
        title="Not Available Yet"
        message="This trip isn't marked as completed yet, so reviews aren't open. Please check back soon."
      />
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Thanks for your review!</h1>
          <p className="text-muted-foreground">
            Your feedback on <span className="font-semibold">{data.tripTitle}</span> has been submitted.
          </p>
        </div>
      </div>
    );
  }

  const isValid = rating > 0 && comment.trim().length > 0;
  const isEdit = !!data.existingReview;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <div className="max-w-[528px] w-full bg-card rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">{isEdit ? 'Edit Your Review' : 'How Was Your Trip?'}</h1>
          <p className="text-sm text-muted-foreground">
            {data.tripTitle}{data.destination ? ` — ${data.destination}` : ''}
          </p>
          {data.travelDates && <p className="text-xs text-muted-foreground">{data.travelDates}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-foreground">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="w-10 h-10 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill={star <= (hoveredRating || rating) ? '#F59E0B' : 'none'}
                  stroke={star <= (hoveredRating || rating) ? '#F59E0B' : '#E5E7EB'}
                  strokeWidth="3.33"
                >
                  <path d="M16 4L19 13H28L21 19L24 28L16 22L8 28L11 19L4 13H13L16 4Z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience... What did you enjoy most? Would you recommend this trip?"
            rows={6}
            maxLength={2000}
            className="px-4 py-3.5 bg-neutral-50 rounded-xl border-2 border-gray-200 text-neutral-900 text-base outline-none focus:border-neutral-900 resize-none"
          />
          <span className="text-xs text-muted-foreground">{comment.length}/2000</span>
        </div>

        {submitError && (
          <p className="text-sm text-red-500">{submitError.message}</p>
        )}

        <Button
          onClick={() => submitReview({ rating, comment: comment.trim() })}
          variant="contained"
          fullWidth
          disabled={!isValid || isSubmitting}
          className="py-3!"
          style={{ opacity: isValid && !isSubmitting ? 1 : 0.4 }}
        >
          {isSubmitting ? 'Submitting…' : isEdit ? 'Update Review' : 'Submit Review'}
        </Button>
      </div>
    </div>
  );
}
