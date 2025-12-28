'use client'

import { useEffect } from "react"
import { notify } from "@/common/utils/notify"
import usePostData from "@/services/usePostData"
import { apiUrls } from "@/common/constants/apiURLS"
import { logError } from "@/common/utils/logError"

export const useAuth = (
    authType: 'login' | 'register',
    options?: object
    ) => {

    const { mutate : postData, isPending , error } = usePostData({url : apiUrls[authType], ...options})
    
    useEffect(() => {
        if (error) {
            notify.error(`Error ${authType === 'login' ? 'Logging in' : 'Registering'}! Please try again!`)
            logError({
                error: error,
                location: 'src/common/hooks/customHooks/useAuth.ts',
                when: `trying to ${authType} error`
            })
        }
    }, [error, authType])

    return { post: postData, loading : isPending, error }
}

