'use client';

import React, { useEffect, useState } from 'react';
import { MapPinAreaIcon, MoneyWavyIcon, CaretDownIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import MyImage from '@/common/ui/Image';
import { useLocation } from '@/common/hooks/useLocation';


export interface CitiesResponse {
    cities: City[];
}

interface LocationSelectorProps {
    avatar?: string;
    cities: CitiesResponse;
    cityLoading: boolean;
}

interface City {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
}

// Default Delhi coordinates and details
const DELHI_DEFAULT = {
    latitude: 28.6139,
    longitude: 77.2090,
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    address: 'Delhi, India',
};

// Skeleton loader component
const SkeletonLoader = () => (
    <div className="h-8 bg-gray-300 rounded-md w-24 animate-pulse" />
);

const LocationSelector: React.FC<LocationSelectorProps> = ({
    avatar, cities, cityLoading
}) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { locationDetails, setLocationDetails, setCityLocation, isLoading } = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Set Delhi as default if location not available
    useEffect(() => {
        if (!locationDetails && !isLoading) {
            setLocationDetails(DELHI_DEFAULT);
        }
    }, [locationDetails, setLocationDetails, isLoading]);

    const displayCity = locationDetails?.city || DELHI_DEFAULT.city;
    const displayState = locationDetails?.state || DELHI_DEFAULT.state;
    const displayAddress = locationDetails?.address || DELHI_DEFAULT.address;

    const handleCitySelect = (city: City) => {
        // Update location store with both coordinates and details
        setCityLocation(city.latitude, city.longitude, {
            city: city.city,
            state: city.state,
            country: city.country,
            address: `${city.city}, ${city.state}`,
            postalCode: '',
        });
        setDropdownOpen(false);
    };

    const handleAvatarClick = () => {
        if (session) {
            router.push('/profile');
        } else {
            router.push('/auth');
        }
    };

    return (
        <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-3 flex-1">
                <MapPinAreaIcon size={24} className="w-10 h-10 text-neutral-700 flex-shrink-0" weight="thin" />
                <div className="flex flex-col flex-1">
                    <span className="text-neutral-700 text-xs sm:text-sm font-medium">
                        Currently viewing for
                    </span>
                    <div className="relative inline-block">
                        {isLoading ? (
                            <SkeletonLoader />
                        ) : (
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 text-black text-xl sm:text-3xl font-bold transition-colors text-left pb-1"
                                
                            >
                                <span>{displayCity}</span>
                                <CaretDownIcon
                                    size={20} 
                                    className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    weight="thin"
                                />
                            </button>
                        )}

                        {/* Dropdown menu */}
                        {dropdownOpen && !isLoading && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white rounded-lg shadow-lg z-50 w-72 overflow-hidden" style={{ border: '1px solid #448AFF' }}>
                                {cityLoading ? (
                                    <div className="p-4 text-black text-sm text-center">Loading cities...</div>
                                ) : (
                                    <div className="max-h-96 overflow-y-auto">
                                        {/* Current location section */}
                                        {locationDetails && (
                                            <>
                                                <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#f0f4ff' }}>
                                                    <div className="flex items-start gap-2">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#448AFF' }}></div>
                                                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#448AFF' }}>Your Current Location</span>
                                                            </div>
                                                            <p className="text-sm font-bold text-black">
                                                                {displayCity}, {displayState}
                                                            </p>
                                                            <p className="text-xs text-black mt-1 opacity-60">
                                                                {displayAddress}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="px-4 py-2">
                                                    <p className="text-xs font-semibold uppercase tracking-wide opacity-40" style={{ color: '#448AFF' }}>Other Locations</p>
                                                </div>
                                            </>
                                        )}

                                        {/* Available cities */}
                                        {cities.cities.length > 0 ? (
                                            cities.cities.map((city, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleCitySelect(city)}
                                                    className="w-full px-4 py-3 text-left transition-all border-b last:border-b-0 group"
                                                    style={{ borderColor: '#f0f0f0', backgroundColor: 'transparent' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF9E6'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <p className="text-sm font-semibold text-black">
                                                        {city.city}, {city.state}
                                                    </p>
                                                    <p className="text-xs text-black mt-0.5 opacity-50">
                                                        {city.country}
                                                    </p>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-6 text-center text-black text-sm opacity-40">
                                                No other locations available
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {status == 'authenticated' && (
                    <button
                        onClick={() => router.push('/wallet')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                        aria-label="View wallet"
                    >
                        <MoneyWavyIcon className="w-8 h-8 text-neutral-700" weight="regular" />
                        <div className="absolute top-2 left-1 w-3 h-3 bg-[#F44336] rounded-full" />
                    </button>
                )}
                {avatar ? (
                    <button
                        onClick={handleAvatarClick}
                        className="p-0 rounded-full transition-opacity hover:opacity-80"
                        aria-label="Go to profile or login"
                    >
                        <MyImage
                            src={avatar}
                            alt="User avatar"
                            className="w-10 h-10"
                            rounded={true}
                        />
                    </button>
                ) : (
                    <button
                        onClick={handleAvatarClick}
                        className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg hover:opacity-80 transition-opacity"
                        aria-label="Go to profile or login"
                    >
                        🧑
                    </button>
                )}
            </div>
        </div>
    );
};

export default LocationSelector;
