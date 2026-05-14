'use client'

import { useState } from 'react'

export function useImageUrls() {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const handleImagesChange = (urls: string[] | File[]) => {
    // Filter to only string URLs (uploaded images)
    const stringUrls = urls.filter((url): url is string => typeof url === 'string')
    setImageUrls(stringUrls)
  }

  const clearImages = () => {
    setImageUrls([])
  }

  return {
    imageUrls,
    handleImagesChange,
    clearImages,
  }
}