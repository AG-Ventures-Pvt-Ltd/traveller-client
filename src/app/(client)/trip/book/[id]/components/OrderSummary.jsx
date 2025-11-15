import TripDetails from './TripDetails';
import PricingSection from './PricingSection';
import SecureCheckout from './SecureCheckout';
import { useGetData } from '../../../../../../services/useGetData';

const OrderSummary = ({ tripId, selectedDate, guests = 1, onApplyDiscount, onSaveAndNext, agreedToTerms, onAgreeToTerms }) => {

  const actualTripId = tripId ? (tripId.split('-').pop() || tripId) : '';

  const { data : tripDetails, isLoading, error } = useGetData(`api/client/v1/trips/details/${actualTripId}/booking?date=${selectedDate.split('T')[0]}&seats=${guests}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading trip details</div>;

  if (!tripDetails) return <div>No data available</div>;


  const subtotal = tripDetails.basePrice * guests;
  const convenienceFee = 100.00;
  const gst = (subtotal + convenienceFee) * 0.05;
  const total = subtotal + convenienceFee + gst;

  const pricing = {
    subtotal,
    convenienceFee,
    gst,
    discount: 0,
    total
  };

  const tripData = {
    title: tripDetails.title,
    details: {
      poc: tripDetails.host.name,
      travelPartner: tripDetails.host.name, 
      numberOfPax: guests.toString()
    }
  };

  return (
    <div className="flex-1 bg-[#FCFDFF] overflow-y-auto">
      <div className="p-4 md:p-8 lg:px-16 lg:py-8">
        <h2 className="text-black text-2xl md:text-[32px] font-semibold font-dm-sans mb-6">
          {tripData.title}
        </h2>

        <TripDetails details={tripData.details} guests={guests} />
        
        <PricingSection 
          pricing={pricing} 
          onApplyDiscount={onApplyDiscount}
          onSaveAndNext={onSaveAndNext}
          guests={guests}
          agreedToTerms={agreedToTerms}
          onAgreeToTerms={onAgreeToTerms}
        />
        
        <SecureCheckout />
      </div>
    </div>
  );
};

export default OrderSummary;
