'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPinIcon, CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import { useLocation } from '@/common/hooks/useLocation';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { CitiesResponse } from '../../MobileLanding/components/LocationSelector';

const DELHI_DEFAULT = {
  latitude: 28.6139,
  longitude: 77.209,
  city: 'Delhi',
  state: 'Delhi',
  country: 'India',
  postalCode: '110001',
  address: 'Delhi, India',
};

const LocationSelector: React.FC = () => {
  const { locationDetails, setLocationDetails, setCityLocation, isLoading } = useLocation();
  const { data: cities, isLoading: cityLoading } = useGetData<CitiesResponse>(
    API_ENDPOINTS.LANDING_PAGE.CITIES
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!locationDetails && !isLoading) setLocationDetails(DELHI_DEFAULT);
  }, [locationDetails, setLocationDetails, isLoading]);

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
  const cityList = cities?.cities ?? [];

  if (isLoading) {
    return <div className="h-9 w-32 animate-pulse rounded-full bg-neutral-200" />;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Trips near ${displayCity}. Change location`}
        className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
      >
        <MapPinIcon size={24} weight="fill" className="text-[#1B4332] shrink-0" />
        <span className="flex flex-col items-start leading-none -gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-600">
            Trips from
          </span>
          <span className="font-bold text-base text-neutral-900">{displayCity}</span>
        </span>
        <CaretDownIcon
          size={13}
          weight="bold"
          className={`text-neutral-700 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] ring-1 ring-neutral-100"
          role="listbox"
          aria-label="Select city"
        >
          <div className="border-b border-neutral-100 bg-[#F4FBF7] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B4332]/60">
              Your area
            </p>
            <p className="mt-0.5 text-sm font-bold text-neutral-900">
              {displayCity}
              {displayState && displayState !== displayCity && (
                <span className="ml-1 font-medium text-neutral-400">{displayState}</span>
              )}
            </p>
          </div>

          <div className="py-1.5 max-h-72 overflow-y-auto">
            {cityLoading ? (
              <div className="space-y-1 px-3 py-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 animate-pulse rounded-xl bg-neutral-100" />
                ))}
              </div>
            ) : cityList.length > 0 ? (
              <>
                <p className="px-4 pt-1.5 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Explore elsewhere
                </p>
                {cityList.map((city, idx) => {
                  const isActive =
                    city.city === displayCity && city.state === displayState;
                  return (
                    <button
                      key={idx}
                      role="option"
                      aria-selected={isActive}
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
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-[#F4FBF7] ${
                        isActive ? 'bg-[#E8F5EE]' : ''
                      }`}
                    >
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-neutral-900">{city.city}</span>
                        <span className="text-[11px] text-neutral-400">{city.state}</span>
                      </span>
                      {isActive && (
                        <CheckIcon size={15} weight="bold" className="text-[#1B4332]" />
                      )}
                    </button>
                  );
                })}
              </>
            ) : (
              <p className="px-4 py-5 text-center text-sm text-neutral-400">
                No other locations available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
