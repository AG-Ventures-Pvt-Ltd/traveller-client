export type TripStatus = 'confirmed' | 'completed' | 'cancelled' | 'pending'
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface BookedTrip {
  _id : string
  tripSlug : string
  tripImage : string
  title: string
  hostName : string
  bookedOn: string
  travelers: string
  amount: number
  tripStatus : TripStatus
  paymentStatus: PaymentStatus
  tripDate: string
  isCompleted : boolean
  hasFilledDetails: boolean
  hasReview: boolean
}

