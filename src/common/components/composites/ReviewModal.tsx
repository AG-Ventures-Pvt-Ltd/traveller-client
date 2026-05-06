import React, { useState } from 'react'
import MobileModal from "@/common/ui/MobileModal"
import { StarIcon } from '@phosphor-icons/react'
import CustomInput from '@/common/ui/CustomInput'
import Button from '../atoms/Button'
import ImageInput from '@/common/ui/ImageInput'

interface ReviewModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (rating: number, review: string) => void
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

    const handleSubmit = () => {
        onSubmit(rating, review)
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
            <div>
                <div className="mb-4 flex justify-center">
                    <div className="flex gap-1">
                        {renderStars()}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Write a review</label>
                    <CustomInput type='textarea' value={review} onChange={(d) => setReview(d.target.value)} />
                </div>
                <div className='mb-6'>
                    <ImageInput text={'Share us your memories !'} onImagesChange={() => { }} />
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




