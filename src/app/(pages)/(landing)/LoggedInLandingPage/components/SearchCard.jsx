import React from 'react';
import { MapPin, Calendar, Users, Grid3x3, Clock, DollarSign, Search, ArrowRight } from 'lucide-react';

const SearchCard = () => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-[0px_8px_32px_0px_rgba(0,0,0,0.08)] border border-black/10 p-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-14 h-14 bg-gradient-to-b from-neutral-900 to-zinc-800 rounded-2xl shadow-lg flex items-center justify-center">
          <Search className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-neutral-900 text-3xl font-bold font-['Satoshi']">
            Find Your Perfect Tour
          </h2>
          <p className="text-neutral-700 text-base font-medium font-['Satoshi']">
            Customize your search to discover experiences tailored just for you
          </p>
        </div>
      </div>

      {/* Search Fields Grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* Row 1 */}
        <SearchField 
          icon={<MapPin className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />}
          label="Destination"
          placeholder="Where to?"
        />
        <SearchField 
          icon={<Calendar className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />}
          label="Departure"
          type="date"
        />
        <SearchField 
          icon={<Calendar className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />}
          label="Return"
          type="date"
        />
        <SearchField 
          icon={<Users className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />}
          label="Travelers"
          placeholder="1 traveler"
        />

        {/* Row 2 */}
        <SearchField 
          icon={<Grid3x3 className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />}
          label="Tour Type"
          placeholder="All types"
        />
        <SearchField 
          icon={<Clock className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />}
          label="Duration"
          placeholder="Any duration"
        />
        <SearchField 
          icon={<DollarSign className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />}
          label="Budget"
          placeholder="Any budget"
        />
        
        {/* Search Button */}
        <div className="flex flex-col gap-3">
          <div className="h-6 opacity-0">Hidden</div>
          <button className="w-full h-16 bg-gradient-to-b from-neutral-900 to-zinc-800 rounded-2xl flex items-center justify-center gap-2 hover:from-neutral-800 hover:to-zinc-700 transition-colors">
            <Search className="w-5 h-5 text-white" strokeWidth={2} />
            <span className="text-white text-base font-bold font-['Satoshi']">
              Search Tours
            </span>
            <ArrowRight className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchField = ({ icon, label, placeholder, type = 'text' }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-neutral-900 text-base font-bold font-['Satoshi']">
          {label}
        </label>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-neutral-50 rounded-2xl border border-gray-200 text-neutral-900 text-base font-medium font-['Satoshi'] placeholder:text-neutral-900/50 focus:outline-none focus:border-neutral-900"
      />
    </div>
  );
};

export default SearchCard;
