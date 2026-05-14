'use client'

import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { SupportTicket } from '../types'

export function useTickets() {
  return useGetData<SupportTicket[]>(API_ENDPOINTS.SUPPORT.GET_TICKETS)
}
