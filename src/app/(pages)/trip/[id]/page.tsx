import TripPage from './components/TripPage'; // your existing component, renamed
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { getServerData } from '@/services/serverApi';
import { TripMetadata } from './types';


export async function generateMetadata({ params } : { params: Promise<{ id: string }> }) {
  
  const { id } = await params ;

  const slug = id.split('-').pop() || '';

    if (!slug) {
    return {
      title: 'Trip Not Found',
    };
  }
    const trip = await getServerData<TripMetadata>(API_ENDPOINTS.TRIPS.GET_METADATA(slug));
    
    return {
      title : `${trip.title} · ${trip.numberOfDays} ${trip.location}`,
      openGraph : {
        title : `${trip.title} · ${trip.numberOfDays}D in ${trip.location} hosted by ${trip.hostName}`,
        images : [{ url : `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${trip.image}`, width: 1200, height: 630 }] ,
        url :  `https://wondrr.in/trip/${slug}` ,
        type: 'website',
      }
    }
}

export default function Page() {
  return <TripPage/>;
}