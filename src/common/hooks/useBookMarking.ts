'use client'

import { useState, useEffect } from 'react'
import usePostData from '@/services/usePostData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { useQueryClient } from '@tanstack/react-query'
import { notify } from '@/common/utils/notify'
import { Fab } from '@mui/material'

export function useBookMarking(tripSlug: string, initialIsBookmarked: boolean = false) {
    const queryClient = useQueryClient()
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)

    useEffect(() => {
        setIsBookmarked(initialIsBookmarked)
    }, [initialIsBookmarked])

    const toggleBookmarkMutation = usePostData({
        url: API_ENDPOINTS.BOOKMARKS.TOGGLE_BOOKMARK,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.BOOKMARKS.GET_USER_BOOKMARKS] })
        },
        onError: () => {
            notify.error('Please login to add bookmark')
            setIsBookmarked((prev) => !prev)
        },
        enableNotifications : false
    })

    const toggle = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setIsBookmarked((prev) => !prev)
        toggleBookmarkMutation.mutate({ tripSlug })
    }

    return { isBookmarked, toggle }
}
