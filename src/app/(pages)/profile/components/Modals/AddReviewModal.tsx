'use client';

import { useState } from 'react';
import Modal from '@/common/ui/Modal';
import Button from '@/common/components/atoms/Button';

interface AddReviewModalProps {
  open: boolean;
  onClose: () => void;
  tripTitle: string;
}

export function AddReviewModal({ open, onClose, tripTitle }: AddReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (rating > 0 && reviewText.trim()) {
      // TODO: Implement API call to submit review
      console.log('Submitting review:', { rating, review: reviewText, tripTitle });
      setRating(0);
      setReviewText('');
      onClose();
    }
  };

  const isValid = rating > 0 && reviewText.trim().length > 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Write a Review"
      showButtons={false}
    >
      <div className="flex flex-col gap-5 max-w-[528px]">
        {/* Trip Title */}
        <h3 className="text-neutral-700 text-base font-bold font-['Satoshi'] leading-6">
          {tripTitle}
        </h3>

        {/* Rating */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <label className="text-neutral-900 text-sm font-bold font-['Satoshi'] leading-5">
              Rating
            </label>
            <span className="text-red-500 text-sm font-bold font-['Satoshi'] leading-5">
              *
            </span>
          </div>
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

        {/* Review Text */}
        <div className="flex flex-col gap-2">
          <label className="text-neutral-900 text-sm font-bold font-['Satoshi'] leading-5">
            Your Review
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with others... What did you enjoy most? Would you recommend this tour?"
            rows={6}
            className="px-4 py-3.5 bg-neutral-50 rounded-xl border-2 border-gray-200 text-neutral-900 text-base font-medium font-['Satoshi'] leading-6 outline-none focus:border-neutral-900 resize-none"
          />
          <span className="text-neutral-700 text-xs font-medium font-['Satoshi'] leading-5">
            {reviewText.length} characters
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-2">
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth
            className="py-4!"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            disabled={!isValid}
            className="py-3!"
            style={{ opacity: isValid ? 1 : 0.3 }}
            startIcon={
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path
                  d="M16 5L7.5 13.5L4 10"
                  stroke="currentColor"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Submit Review
          </Button>
        </div>
      </div>
    </Modal>
  );
}
