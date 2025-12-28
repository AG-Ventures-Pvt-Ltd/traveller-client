'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Header from './components/Header';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  // Update query params when guests change
  useEffect(() => {
    const currentGuests = searchParams.get('guests');
    if (currentGuests !== guests.toString()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('guests', guests.toString());
      router.replace(`/trip/book/${id}?${params.toString()}`, { scroll: false });
    }
  }, [guests, id, router]);

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
      <Header currentStep={pageData.currentStep} />
      <div className="flex flex-1 overflow-hidden">
        <CheckoutForm
          onQuickFill={handleQuickFill}
          onAddPax={handleAddPax}
          initialGuests={guests}
          selectedDate={selectedDate}
          onGuestsChange={setGuests}
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