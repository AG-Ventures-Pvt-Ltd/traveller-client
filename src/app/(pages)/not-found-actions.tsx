'use client';

import { useRouter } from 'next/navigation';
import Button from '@/common/ui/Buttons/Button';

export default function NotFoundActions() {
  const router = useRouter();

  return (
    <div className="mt-8 flex gap-3">
      <Button variant="primary" onClick={() => router.push('/')} className="!py-3 px-5">
        Go home
      </Button>
      <Button variant="yellow" onClick={() => router.push('/trips')} className="!py-3 px-5">
        Browse all trips
      </Button>
    </div>
  );
}
