'use client';

import React, { useMemo, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import ContactDetails from './component/ContactDetails';
import { TravelerData, TravelerDetailsProps } from '../types';
import { validateTravelerForm } from '@/common/utils/formValidators';

const TravelerDetails: React.FC<TravelerDetailsProps> = ({
    travelers,
    onTravelersChange,
    guests,
    onGuestsChange,
    onNext,
}) => {
    
    const handleTravelerChange = useCallback((index: number, data: TravelerData) => {
        onTravelersChange(prevTravelers => {
            const newTravelers = [...prevTravelers];
            newTravelers[index] = data;
            return newTravelers;
        });
    }, [onTravelersChange]);

    const handleGuestsIncrease = useCallback(() => {
        onGuestsChange(guests + 1);
    }, [guests, onGuestsChange]);

    const handleGuestsDecrease = useCallback(() => {
        if (guests > 1) {
            onGuestsChange(guests - 1);
        }
    }, [guests, onGuestsChange]);

    const isFormValid = useMemo(() => {
        return validateTravelerForm(travelers);
    }, [travelers]);

    const handleNext = useCallback(() => {
        if (isFormValid) {
            onNext();
        }
    }, [isFormValid, onNext]);

    return (
        <div className="flex flex-col">
            <div className="pb-5">
                <p className="text-[#404040] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
                    We&apos;ll use this information to send you confirmation and updates about your booking
                </p>
            </div>
            <div className="py-5 flex flex-col gap-3 border-t border-[#EDEDED]">
                <h3 className="text-[#121212] text-[15px] font-bold font-['Satoshi'] leading-[22.5px]">
                    Number of travelers
                </h3>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleGuestsDecrease}
                        disabled={guests <= 1}
                        className={`w-12 h-12 rounded-xl border border-[#EDEDED] flex items-center justify-center transition-all ${guests <= 1
                            ? 'bg-white opacity-50 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-50'
                            }`}
                    >
                        <Minus className="w-5 h-5 text-[#121212]" strokeWidth={2} />
                    </button>
                    <div className="flex-1 flex flex-col items-center">
                        <span className="text-[#121212] text-2xl font-bold font-['Satoshi'] leading-9">
                            {guests}
                        </span>
                        <span className="text-[#404040] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
                            Adults
                        </span>
                    </div>
                    <button
                        onClick={handleGuestsIncrease}
                        className="w-12 h-12 bg-[#121212] rounded-xl flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
                    >
                        <Plus className="w-5 h-5 text-white" strokeWidth={2} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                {travelers.map((traveler, index) => (
                    <div key={index} className="pt-5">
                        <ContactDetails
                            travelerIndex={index + 1}
                            isPrimary={index === 0}
                            data={traveler}
                            onChange={(data) => handleTravelerChange(index, data)}
                        />
                    </div>
                ))}
            </div>
            <div className="pt-6">
                <button
                    onClick={handleNext}
                    disabled={!isFormValid}
                    className={`w-full py-4 rounded-xl text-white text-[16px] font-bold font-['Satoshi'] leading-6 transition-colors ${
                        isFormValid
                            ? 'bg-[#121212] hover:bg-[#2a2a2a] cursor-pointer'
                            : 'bg-neutral-400 cursor-not-allowed opacity-50'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TravelerDetails;