import React from 'react';
import Card from '@/common/ui/Card';

const OrderSummarySkeleton = () => {
  return (
    <Card variant='fill' className="w-full rounded-3xl p-5 bg-white!">
      <div className='flex gap-4'>
        <div className="relative aspect-[2/2] rounded-2xl overflow-hidden mb-8 w-[32%]">
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
        </div>
      </div>
      <div className="pb-6 border-b-2 border-gray-200 flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-24"></div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-32"></div>
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex justify-between items-start">
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-16"></div>
        </div>
        <div className="flex justify-between items-start">
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-12"></div>
        </div>
        <div className="flex justify-between items-start">
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-12"></div>
        </div>
      </div>
      <div className="h-0.5 bg-gray-200 mb-6" />
      <div className="flex justify-between items-center mb-8">
        <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-24"></div>
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-20"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-40 mb-2"></div>
        <div className='flex items-center gap-2'>
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-48"></div>
        </div>
        <div className='flex items-center gap-2'>
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-32"></div>
        </div>
        <div className='flex items-center gap-2'>
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-40"></div>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummarySkeleton;