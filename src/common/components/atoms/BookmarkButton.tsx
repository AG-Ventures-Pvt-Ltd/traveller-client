'use client'

import React, { useState, useEffect } from 'react'
import { Heart, LucideIcon } from 'lucide-react'
import usePostData from "@/services/usePostData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from '@/common/utils/notify';

interface BookmarkButtonProps {
  tripSlug: string;
  isBookmarked: boolean;
  icon?: LucideIcon;
  onSuccess?: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ tripSlug, isBookmarked, icon: Icon = Heart, onSuccess }) => {
  const queryClient = useQueryClient();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);

  useEffect(() => {
    setIsBookmarkedState(isBookmarked);
  }, [isBookmarked]);

  const toggleBookmark = usePostData({
    url: API_ENDPOINTS.BOOKMARKS.TOGGLE_BOOKMARK,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.BOOKMARKS.GET_USER_BOOKMARKS] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      notify.error('Please login to add bookmark')
      setIsBookmarkedState(!isBookmarkedState);
    }
  });

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    const newState = !isBookmarkedState;
    setIsBookmarkedState(newState);

    toggleBookmark.mutate({ tripSlug });
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
    >
      <Icon
        className={`w-5 h-5 transition-all duration-300 ease-in-out ${isBookmarkedState
          ? 'text-red-500 fill-red-500'
          : 'text-gray-400 fill-transparent hover:text-gray-600'
          } ${isAnimating ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}`}
      />
    </button>
  );
};

export default BookmarkButton;