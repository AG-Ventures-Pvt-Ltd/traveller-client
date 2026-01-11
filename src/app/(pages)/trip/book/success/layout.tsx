import React from 'react';

export const metadata = {
  title: 'Booking Confirmed - Wondrr',
  description: 'Your trip booking has been confirmed successfully',
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
