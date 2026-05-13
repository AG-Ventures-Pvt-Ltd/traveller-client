'use client'

import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { TransactionsResponse, WalletBalance } from '../types'
import { BookedTrip } from '../../mytrips/constants'

export function useWalletTransactions(limit = 10, skip = 0) {
  const url = API_ENDPOINTS.WALLET.TRANSACTIONS(limit, skip)
  return useGetData<TransactionsResponse>(url, { queryKey: [url] })
}

export function useTripPayments() {
  return useGetData<BookedTrip[]>(API_ENDPOINTS.USER.MY_TRIPS)
}

export function useWalletBalance() {
  return useGetData<WalletBalance>(API_ENDPOINTS.WALLET.BALANCE, {
    queryKey: [API_ENDPOINTS.WALLET.BALANCE],
  })
}
