import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/ui/dialog";
import { Button } from "@/common/ui/button";
import { Textarea } from "@/common/ui/textarea";
import { Label } from "@/common/ui/label";
import { Star, MessageSquare } from "lucide-react";

interface AddReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: {
    id: string;
    destination: string;
  } | null;
  onSubmit: (bookingId: string, rating: number, review: string) => void;
}

export function AddReviewDialog({
  open,
  onOpenChange,
  booking,
  onSubmit,
}: AddReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (booking && rating > 0) {
      onSubmit(booking.id, rating, review);
      setRating(0);
      setReview("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-0 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#008EF4]/10 rounded-xl">
              <MessageSquare className="w-6 h-6 text-[#008EF4]" />
            </div>
            <div>
              <DialogTitle>Add Review</DialogTitle>
              <DialogDescription className="mt-1">
                Share your experience at {booking?.destination}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-gray-700">Rating</Label>
              <div className="flex gap-2 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-125 active:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-gray-600 text-center">
                  {rating === 5 && "⭐ Excellent!"}
                  {rating === 4 && "👍 Very Good!"}
                  {rating === 3 && "😊 Good"}
                  {rating === 2 && "😐 Could be better"}
                  {rating === 1 && "😞 Poor"}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="review" className="text-gray-700">Your Review</Label>
              <Textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience... What did you love? What could be improved?"
                rows={6}
                className="border-gray-200 focus:border-[#008EF4] focus:ring-[#008EF4]/20 resize-none"
                required
              />
              <p className="text-gray-500">{review.length} characters</p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={rating === 0}
              className="bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
