'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPinAreaIcon, CaretDownIcon } from '@phosphor-icons/react';
import { useLocation } from '@/common/hooks/useLocation';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { CitiesResponse } from '../../HomePage/components/LocationSelector';

const DELHI_DEFAULT = {
  latitude: 28.6139,
  longitude: 77.209,
  city: 'Delhi',
  state: 'Delhi',
  country: 'India',
  postalCode: '110001',
  address: 'Delhi, India',
};

const DesktopLocationSelector: React.FC = () => {
  const { locationDetails, setLocationDetails, setCityLocation, isLoading } = useLocation();
  const { data: cities, isLoading: cityLoading } = useGetData<CitiesResponse>(
    API_ENDPOINTS.LANDING_PAGE.CITIES
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Default to Delhi when geolocation is unavailable.
  useEffect(() => {
    if (!locationDetails && !isLoading) setLocationDetails(DELHI_DEFAULT);
  }, [locationDetails, setLocationDetails, isLoading]);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const displayCity = locationDetails?.city || DELHI_DEFAULT.city;
  const displayState = locationDetails?.state || DELHI_DEFAULT.state;
  const displayAddress = locationDetails?.address || DELHI_DEFAULT.address;

  const cityList = cities?.cities ?? [];

  return (
    <div ref={ref} className="relative inline-flex items-center">
      {isLoading ? (
        <div className="h-10 w-36 animate-pulse rounded-full bg-neutral-200" />
      ) : (
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={`Trips in ${displayCity}. Change location`}
          className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 transition-colors hover:border-neutral-400"
        >
          <MapPinAreaIcon size={20} weight="fill" className="text-[#448AFF] flex-shrink-0" />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">Trips in</span>
            <span className="text-sm font-bold text-neutral-900">{displayCity}</span>
          </span>
          <CaretDownIcon
            size={16}
            weight="bold"
            className={`text-neutral-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      )}

      {open && !isLoading && (
        <div
          className="absolute left-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl bg-white shadow-lg"
          style={{ border: '1px solid #448AFF' }}
          role="listbox"
        >
          {cityLoading ? (
            <div className="p-4 text-center text-sm text-black">Loading cities...</div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {locationDetails && (
                <>
                  <div className="border-b border-gray-100 px-4 py-3" style={{ backgroundColor: '#f0f4ff' }}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#448AFF' }} />
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#448AFF' }}>
                        Your Current Location
                      </span>
                    </div>
                    <p className="text-sm font-bold text-black">
                      {displayCity}, {displayState}
                    </p>
                    <p className="mt-1 text-xs text-black opacity-60">{displayAddress}</p>
                  </div>
                  <div className="px-4 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-40" style={{ color: '#448AFF' }}>
                      Other Locations
                    </p>
                  </div>
                </>
              )}

              {cityList.length > 0 ? (
                cityList.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCityLocation(city.latitude, city.longitude, {
                        city: city.city,
                        state: city.state,
                        country: city.country,
                        address: `${city.city}, ${city.state}`,
                        postalCode: '',
                      });
                      setOpen(false);
                    }}
                    className="w-full border-b px-4 py-3 text-left transition-all last:border-b-0"
                    style={{ borderColor: '#f0f0f0', backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF9E6')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <p className="text-sm font-semibold text-black">
                      {city.city}, {city.state}
                    </p>
                    <p className="mt-0.5 text-xs text-black opacity-50">{city.country}</p>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-black opacity-40">
                  No other locations available
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopLocationSelector;
