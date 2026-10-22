import React, { useState } from 'react'
import MobileModal from "@/common/ui/MobileModal"
import { StarIcon } from '@phosphor-icons/react'
import Button from '../atoms/Button'
import ImageInput from '@/common/ui/ImageInput'

interface ReviewModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (rating: number, review: string, images: string[]) => void
    initialRating?: number
    initialReview?: string
    title?: string
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialRating = 0,
    initialReview = '',
    title = 'Write a Review'
}) => {
    const [rating, setRating] = useState(initialRating)
    const [review, setReview] = useState(initialReview)
    const [imageUrls, setImageUrls] = useState<string[]>([])

    const handleImagesChange = (urls: string[] | File[]) => {
        setImageUrls(urls.filter((url): url is string => typeof url === 'string'))
    }

    const handleSubmit = () => {
        onSubmit(rating, review, imageUrls)
        onClose()
    }

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => (
            <button
                key={i}
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
            >
                <StarIcon
                    size={32}
                    weight={i < rating ? 'fill' : 'thin'}
                    className={i < rating ? 'text-yellow-400' : ''}
                />
            </button>
        ))
    }

    return (
        <MobileModal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="w-full md:w-[420px]">
                <div className="mb-4 flex justify-center">
                    <div className="flex gap-1">
                        {renderStars()}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Write a review</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your experience..."
                        rows={5}
                        className="w-full px-3 py-3 rounded-xl border border-zinc-300 text-sm text-black placeholder-black/40 outline-none focus:border-neutral-900 resize-none"
                    />
                </div>
                <div className='mb-6'>
                    <ImageInput text={'Share us your memories !'} onImagesChange={handleImagesChange} autoUpload />
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className="w-full py-3 px-4 bg-[#EEA0FF]! text-black! rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Submit Review
                </Button>
            </div>
        </MobileModal>
    )
}

export default ReviewModal




