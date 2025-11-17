'use client';

import { useSearchParams } from 'next/navigation';


export default function Page() {
  const searchParams = useSearchParams();
  const destination = searchParams.get('destination');

  console.log('Destination from query params:', destination);


  return <div>trips page</div>;
}