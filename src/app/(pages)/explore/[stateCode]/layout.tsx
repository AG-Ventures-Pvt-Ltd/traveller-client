import type { Metadata } from 'next';
import { getStateTrips } from './serverFetch';

// Without this, the page inherited the shared (pages) layout's canonical,
// which wrongly pointed every explore/[stateCode] URL at "/".
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateCode: string }>;
}): Promise<Metadata> {
  const { stateCode } = await params;
  const code = stateCode.toUpperCase();
  const data = await getStateTrips(code);
  const stateName = data?.state?.name || code;

  const title = `Group Trips in ${stateName} | Wondrr`;
  const description = `Browse fixed-departure group trips in ${stateName} from verified Indian travel operators on Wondrr.`;
  const canonical = `https://wondrr.in/explore/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website' },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
