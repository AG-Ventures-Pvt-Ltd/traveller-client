import TripPage from './components/TripPage'; // your existing component, renamed
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { getServerData } from '@/services/serverApi';
import { TripMetadata } from './types';


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const slug = id.split('-').pop() || '';

  if (!slug) {
    return {
      title: 'Trip Not Found',
    };
  }
  const trip = await getServerData<TripMetadata>(API_ENDPOINTS.TRIPS.GET_METADATA(slug));

  const title = `${trip.title} · ${trip.numberOfDays} Days in ${trip.location}`;
  const description = `${trip.hostName} on Wondrr is taking a group trip to ${trip.location} for ${trip.numberOfDays} days. Tap to see more details! 🌍`;
  const image = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${trip.image}`;
  const url = `https://wondrr.in/trip/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 600 }],
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default function Page() {
  return <TripPage />;
}