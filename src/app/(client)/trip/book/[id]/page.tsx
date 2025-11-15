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

  const pageData = {
    logo: 'Wondrr',
    currentStep: 1
  };

  const [guests, setGuests] = useState(initialGuests);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
          tripId={id}
          selectedDate={selectedDate}
          guests={guests}
          onApplyDiscount={handleApplyDiscount}
          onSaveAndNext={handleSaveAndNext}
          agreedToTerms={agreedToTerms}
          onAgreeToTerms={setAgreedToTerms}
        />
      </div>
    </div>
  );
}

export default Page