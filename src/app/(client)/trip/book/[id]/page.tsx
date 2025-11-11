'use client'

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Header from './components/Header';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';

const Page = () => {
  const searchParams = useSearchParams();
  
  const { id } = useParams();
  const selectedDate = searchParams.get('date');
  const guestsParam = searchParams.get('guests');
  const initialGuests = guestsParam ? parseInt(guestsParam) : 1;

  // console.log('Selected Date:', selectedDate,guestsParam,initialGuests,id );  
  
  const pageData = {
    logo: 'Wondrr',
    currentStep: 1,
    tripData: {
      title: 'Explore Manali like never before - Manali Group Trip',
      details: {
        poc: 'Rajesh S.',
        travelPartner: 'Sri Sri Travels',
        numberOfPax: initialGuests.toString()
      }
    },
    initialPricing: {
      subtotal: 45.00,
      platformCharges: 5.00,
      tax: 10.00,
      discount: 0,
      total: 40.00
    }
  };

  const [guests, setGuests] = useState(initialGuests);

  const pricing = pageData.initialPricing;

  const handleQuickFill = () => {
    // Implement quick fill logic
  };

  const handleAddPax = () => {
    setGuests(prev => prev + 1);
    // Implement add pax logic
  };

  const handleApplyDiscount = () => {
    // Implement discount logic
  };

  const handleSaveAndNext = () => {
    // Implement save and navigation logic
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F9F9FB]">
      <Header logo={pageData.logo} currentStep={pageData.currentStep} />
      
      <div className="flex flex-1 overflow-hidden">
        <CheckoutForm 
          onQuickFill={handleQuickFill}
          onAddPax={handleAddPax}
          initialGuests={guests}
          selectedDate={selectedDate}
        />
        
        <OrderSummary 
          tripData={pageData.tripData}
          pricing={pricing}
          onApplyDiscount={handleApplyDiscount}
          onSaveAndNext={handleSaveAndNext}
          guests={guests}
        />
      </div>
    </div>
  );
}

export default Page