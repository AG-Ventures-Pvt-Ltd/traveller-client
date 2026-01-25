'use client'

import React from 'react'
import { Bookmark, LucideIcon } from 'lucide-react'
import usePostData from "@/services/usePostData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useQueryClient } from "@tanstack/react-query";

interface BookmarkButtonProps {
  tripSlug: string;
  isBookmarked: boolean;
  icon?: LucideIcon;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ tripSlug, isBookmarked, icon: Icon = Bookmark }) => {
  const queryClient = useQueryClient();

  const toggleBookmark = usePostData({
    url: API_ENDPOINTS.BOOKMARKS.TOGGLE_BOOKMARK,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.BOOKMARKS.GET_USER_BOOKMARKS] });
    }
  });

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark.mutate({ tripSlug });
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all hover:scale-110"
    >
      <Icon className={`w-5 h-5 ${isBookmarked ? 'text-[#008EF4] fill-[#008EF4]' : 'text-gray-400'}`} />
    </button>
  );
};

export default BookmarkButton;