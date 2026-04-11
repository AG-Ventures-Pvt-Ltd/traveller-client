'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { SparkleIcon, MoneyWavyIcon } from '@phosphor-icons/react';



interface SuggestionBannerProps {
    suggestion?: string;
    placeholder?: string;
    onSearch?: (value: string) => void;
}

const SuggestionBanner: React.FC<SuggestionBannerProps> = ({
    suggestion = "Shreyansh's next escape ?",
    placeholder = 'Search by keywords or places',
    onSearch
}) => {
    const [searchValue, setSearchValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onSearch?.(e.target.value);
    };

    return (
        <div className="w-full bg-gradient-to-r from-lime-300 to-lime-200 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <SparkleIcon className="w-8 h-8 text-neutral-900" fill="currentColor" />
                    <p className="text-neutral-900 text-lg sm:text-xl font-bold font-['Satoshi']">
                        {suggestion}
                    </p>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" strokeWidth={2} />
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchValue}
                        onChange={handleChange}
                        className="w-full bg-white rounded-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 text-neutral-900 placeholder-neutral-500 text-base font-['Satoshi'] border-2 border-white focus:outline-none focus:border-neutral-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default SuggestionBanner;
