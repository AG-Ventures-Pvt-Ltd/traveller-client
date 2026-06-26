import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface TripBreadcrumbProps {
  title: string;
  className?: string;
}

export default function TripBreadcrumb({ title, className = '' }: TripBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1 text-sm">
        <li>
          <Link href="/" className="font-medium text-neutral-500 transition-colors hover:text-neutral-900">
            Home
          </Link>
        </li>
        <ChevronRight size={15} className="flex-shrink-0 text-neutral-300" aria-hidden="true" />
        <li>
          <Link href="/trips" className="font-medium text-neutral-500 transition-colors hover:text-neutral-900">
            Trips
          </Link>
        </li>
        <ChevronRight size={15} className="flex-shrink-0 text-neutral-300" aria-hidden="true" />
        <li className="min-w-0">
          <span className="block truncate font-semibold text-neutral-900" title={title}>
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
