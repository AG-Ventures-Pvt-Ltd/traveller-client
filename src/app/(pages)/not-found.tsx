import NotFoundActions from './not-found-actions';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF9F4] px-6 text-center">
      <h1 className="mt-2 text-3xl font-bold text-neutral-900">Page not found</h1>
      <p className="mt-3 max-w-md text-neutral-600">
        The page you’re looking for doesn’t exist or may have moved. You may explore other
        trips from India’s top travel brands instead.
      </p>
      <NotFoundActions />
    </div>
  );
}
