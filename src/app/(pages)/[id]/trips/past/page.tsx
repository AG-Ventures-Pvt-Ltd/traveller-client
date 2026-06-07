'use client'

import { useParams } from 'next/navigation'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import HostTripsGrid from '../components/HostTripsGrid'

export default function PastTripsPage() {
  const id = useParams().id as string
  return <HostTripsGrid title="Past Trips" buildUrl={(page) => API_ENDPOINTS.HOST.ARCHIVED_TRIPS(id, page, 12)} queryKey={['host-past-trips', id]} />
}
