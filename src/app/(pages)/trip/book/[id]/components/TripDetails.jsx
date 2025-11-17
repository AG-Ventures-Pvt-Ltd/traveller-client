
const TripDetails = ({ details, guests = 1 }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#818EA1] text-sm font-dm-sans">Trip Host</span>
        <span className="text-black text-sm font-semibold font-dm-sans">{details.poc}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[#818EA1] text-sm font-dm-sans">No. of Pax</span>
        <span className="text-black text-sm font-semibold font-dm-sans">{guests}</span>
      </div>
    </div>
  );
};

export default TripDetails;
