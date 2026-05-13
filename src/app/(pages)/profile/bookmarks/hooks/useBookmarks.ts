'use client'

import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { BookmarkedTrip } from '@/app/(pages)/profile/bookmarks/types'

export function useBookmarks() {
  return useGetData<BookmarkedTrip[]>(API_ENDPOINTS.BOOKMARKS.GET_USER_BOOKMARKS)
}
