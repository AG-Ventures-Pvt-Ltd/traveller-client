'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Pen, Check } from 'lucide-react';
import Card from '@/common/ui/Card';

interface AccordionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  number?: number | string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  showEdit?: boolean;
  onEdit?: () => void;
  disabled?: boolean;
  className?: string;
  isCompleted?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  icon,
  number,
  children,
  defaultOpen = false,
  showEdit = false,
  onEdit,
  disabled = false,
  className = '',
  isCompleted = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Update isOpen when defaultOpen changes
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const toggleAccordion = () => {
    if (!disabled) {
      // Only allow opening, not closing via header click
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <Card variant='fill' className={`bg-white! ${className}`}>
      <div
        className={`flex justify-between items-center px-5 py-6 cursor-pointer transition-opacity ${isOpen ? "mb-4 border-b-2 border-b-outline" : ""}  ${
          disabled && !isOpen ? 'opacity-50' : 'opacity-100'
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isCompleted
                ? 'bg-black'
                : isOpen || !disabled
                ? 'bg-white border-2 border-primary rounded-full'
                : 'bg-neutral-200'
            }`}
          >
            {isCompleted ? (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            ) : number ? (
              <span
                className={`font-bold font-['Satoshi'] ${
                  isOpen || !disabled ? 'text-primary' : 'text-neutral-600'
                }`}
              >
                {number}
              </span>
            ) : icon ? (
              <div className="text-white">{icon}</div>
            ) : (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen || !disabled ? 'text-white' : 'text-neutral-600'
                } ${isOpen ? 'rotate-180' : ''}`}
                strokeWidth={1.33}
              />
            )}
          </div>
          <div className="flex flex-col gap-0 ">
            <h3 className="text-neutral-900 text-lg font-bold font-['Satoshi'] leading-[27px]">
              {title}
            </h3>
            {subtitle && !isOpen && (
              <p className="text-neutral-600 text-sm font-medium font-['Satoshi'] leading-[21px]">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {showEdit && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 text-neutral-900 text-sm font-medium font-['Satoshi'] leading-[21px] hover:opacity-70 transition-opacity"
          >
            <span>Edit</span>
            <Pen className="w-4 h-4" strokeWidth={2} />
          </button>
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-6">
          {children}
        </div>
      </div>
    </Card>
  );
};

export default Accordion;
