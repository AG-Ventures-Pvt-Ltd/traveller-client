import TripDetails from './TripDetails';
import PricingSection from './PricingSection';
import SecureCheckout from './SecureCheckout';

const OrderSummary = ({ tripData, pricing, onApplyDiscount, onSaveAndNext, guests = 1 }) => {
  return (
    <div className="flex-1 bg-[#FCFDFF] overflow-y-auto">
      <div className="p-4 md:p-8 lg:p-16">
        <h2 className="text-black text-2xl md:text-[32px] font-semibold font-dm-sans mb-6">
          {tripData.title}
        </h2>

        <TripDetails details={tripData.details} guests={guests} />
        
        <PricingSection 
          pricing={pricing} 
          onApplyDiscount={onApplyDiscount}
          onSaveAndNext={onSaveAndNext}
          guests={guests}
        />
        
        <SecureCheckout />
      </div>
    </div>
  );
};

export default OrderSummary;
