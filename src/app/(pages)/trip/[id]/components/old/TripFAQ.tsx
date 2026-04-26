import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TripFAQProps } from '../../types';
import Card from "@/common/ui/Card";


export function TripFAQ({ faqs }: TripFAQProps) {
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return (
      <div className="flex flex-col gap-6 my-8">
        <h2 className="text-xl font-bold text-[#0F172B] tracking-tight">FAQ</h2>
        <div className="text-gray-500 text-center py-8">
          FAQ details are not available yet.
        </div>
      </div>
    );
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 my-6 sm:my-8">
      <h2 className="text-lg sm:text-xl font-bold text-[#0F172B] tracking-tight">FAQ</h2>

      <div className="flex flex-col gap-2 sm:gap-3">
        {faqs.map((faq, index) => {
          const isExpanded = expandedFAQs.includes(index);

          return (
            <Card
              key={index}
              variant="fill"
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded 
                  ? 'shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_2px_16px_-2px_rgba(0,0,0,0.1)]'
                  : 'shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1)]'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/30 transition-colors duration-200 gap-3"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#0F172B] leading-5 sm:leading-6 text-left">
                  {faq.question}
                </h3>
                
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-[#0F172B] transition-transform duration-300 flex-shrink-0 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-white/40">
                  <p className="text-xs sm:text-sm text-[#64748B] leading-5 sm:leading-6">{faq.answer}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
