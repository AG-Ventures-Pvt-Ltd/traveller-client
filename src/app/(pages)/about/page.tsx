'use client'

import Button from "@/common/components/atoms/Button";
import { usePayment } from "@/app/(pages)/trip/book/[id]/hooks/usePayment";

export default function Page() {
  const { startPayment } = usePayment();

  const handlePayment = () => {
    startPayment({
      userId: '6918500aa418253d5bdc2a78',
      batchId: '693b1e392f400afbcda145fe',
      numberOfPeople: 1,
      amount: 50000,
    });
  };

  return (
    <div>
      <Button onClick={handlePayment}>
        PayNow
      </Button>
    </div>
  );
}