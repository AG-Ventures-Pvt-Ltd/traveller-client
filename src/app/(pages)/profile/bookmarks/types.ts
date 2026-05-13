export interface BookmarkedTrip {
  _id: string
  tripSlug: string
  title: string
  image: string
  location: string
  price: number
  category: string
  rating: number
  reviewCount: number
  isActive: boolean
  hostName?: string
  days?: string
}
