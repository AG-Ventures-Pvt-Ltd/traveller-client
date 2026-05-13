'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const MobileModal: React.FC<MobileModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
        <div className="bg-white w-full md:w-auto md:max-w-lg md:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col animate-slideUp">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <h2 className="font-bold text-neutral-900 w-full text-center">{title}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors absolute end-4"
            >
              <X className="w-5 h-5 text-neutral-900" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileModal;
