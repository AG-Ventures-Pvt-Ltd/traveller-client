'use client'

import { useParams } from 'next/navigation'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import HostTripsGrid from '../components/HostTripsGrid'

export default function UpcomingTripsPage() {
  const id = useParams().id as string
  return <HostTripsGrid title="Upcoming Trips" buildUrl={(page) => API_ENDPOINTS.HOST.TRIPS(id, page, 12)} queryKey={['host-upcoming-trips', id]} />
}
