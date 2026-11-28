import TripsPageServer from '../trips/TripsPageServer';

export const dynamic = 'force-dynamic';

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  return <TripsPageServer searchParams={searchParams} kind="trek" />;
}
