import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-9 px-4">
      <div className="max-w-[900px] w-full flex flex-col items-center gap-8">
        <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-100 rounded-full flex items-center justify-center">
          <Loader2 className="w-10 h-10 md:w-14 md:h-14 text-blue-600 animate-spin" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900">Processing...</h1>
          <p className="text-lg md:text-xl font-medium text-neutral-700">
            Please wait while we confirm your booking
          </p>
        </div>
        <div className="w-full bg-neutral-50 rounded-3xl border-2 border-gray-200 px-6 md:px-10 py-10 md:py-16 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-base font-medium text-neutral-700">Verifying payment details...</p>
        </div>
      </div>
    </div>
  );
}