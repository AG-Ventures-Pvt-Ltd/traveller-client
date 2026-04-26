'use client'

import { Review } from '../../../types';
import { ReviewsSectionProps } from '../types';

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
    return (
        <div className="border border-gray-200 rounded-[16px] p-4 mt-6 scroll-mt-24">
            <p className="text-xs font-medium text-black mb-3">Guest Reviews</p>
            <div className="space-y-3">
                {reviews.slice(0, 3).map((review: Review, index: number) => (
                    <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm text-gray-800">{review.author}</p>
                            <span className="text-xs text-yellow-500">★ {review.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
