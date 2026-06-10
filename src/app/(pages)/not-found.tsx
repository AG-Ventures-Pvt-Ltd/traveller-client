import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold tracking-widest text-neutral-500">404</p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900">Page not found</h1>
      <p className="mt-3 max-w-md text-neutral-600">
        The page you’re looking for doesn’t exist or may have moved. Explore verified group
        trips from India’s top travel brands instead.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
        >
          Go home
        </Link>
        <Link
          href="/trips"
          className="rounded-xl border-2 border-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
        >
          Browse all trips
        </Link>
      </div>
    </div>
  );
}
