'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/common/ui/avatar';
import { Badge } from '@/common/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/ui/card';
import TripCard from '@/app/(pages)/(landing)/TripSlider/TripCard';
import TripSlider from '@/app/(pages)/(landing)/TripSlider/TripSlider';
import {
  MapPin,
  Star,
  Award,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
} from 'lucide-react';

const getHostData = (id) => ({
  id,
  name: 'Adventure Explorers',
  brandName: 'Adventure Explorers',
  tagline: 'Creating Unforgettable Journeys Since 2015',
  avatar: '/png/P1.png',
  coverImage: '/png/P2.png',
  rating: 4.8,
  totalReviews: 342,
  location: 'San Francisco, CA',
  email: 'contact@adventureexplorers.com',
  phone: '+1 (555) 123-4567',
  socialLinks: {
    website: 'https://adventureexplorers.com',
    facebook: 'https://facebook.com/adventureexplorers',
    instagram: 'https://instagram.com/adventureexplorers',
    twitter: 'https://twitter.com/adventureexplorers',
    linkedin: 'https://linkedin.com/company/adventureexplorers'
  },
  stats: {
    activeTrips: 12,
    pastTrips: 48,
    totalTravellers: 2856,
    averageRating: 4.8,
    yearsOfExperience: 9
  },
  about: 'We are a team of passionate travelers and adventure seekers dedicated to creating unique and memorable experiences. Our mission is to connect people with cultures, landscapes, and adventures that transform perspectives and create lasting memories.',
  expertise: [
    'Mountain Trekking & Expeditions',
    'Cultural Heritage Tours',
    'Wildlife & Nature Exploration',
    'Adventure Sports & Activities',
    'Sustainable & Eco-Tourism'
  ],
  experience: 'With over 9 years in the travel industry, our team has successfully organized more than 400 trips across 25 countries. We specialize in small group adventures that prioritize authentic experiences and sustainable travel practices.',
  beyondPlatform: 'Before joining this platform, we operated independently for 5 years, organizing corporate retreats, educational tours, and custom adventure packages. We have partnerships with local communities in over 15 destinations, ensuring authentic and responsible tourism.',
  reviews: [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userAvatar: '/png/P1.png',
      rating: 5,
      date: '2024-10-15',
      tripName: 'Himalayan Adventure Trek',
      comment: 'Absolutely incredible experience! The team was professional, knowledgeable, and made sure everyone felt safe and included. The itinerary was perfectly balanced between adventure and rest.'
    },
    {
      id: 2,
      userName: 'Michael Chen',
      userAvatar: '/png/P3.png',
      rating: 5,
      date: '2024-09-28',
      tripName: 'Cultural Japan Experience',
      comment: 'Best trip of my life! The attention to detail and local connections made this trip truly special. Highly recommend Adventure Explorers!'
    },
    {
      id: 3,
      userName: 'Emma Williams',
      userAvatar: '/png/P5.png',
      rating: 4,
      date: '2024-09-10',
      tripName: 'Safari & Wildlife Tour',
      comment: 'Great experience overall. The guides were fantastic and we saw so much wildlife. Only minor issue was some accommodation delays, but they handled it well.'
    }
  ],
  topTrips: [
    {
      _id: '1',
      tripSlug: 'himalayan-trek',
      image: '/png/P1.png',
      title: 'Himalayan Adventure Trek - 12 Days',
      rating: 4.9,
      location: 'China',
      price: 2499,
      reviewCount: 89,
      days: 12,
      isBookmarked: false
    },
    {
      _id: '2',
      tripSlug: 'japan-cultural',
      image: '/png/P2.png',
      title: 'Cultural Japan Experience',
      rating: 4.8,
      location: 'Japan',
      price: 3299,
      reviewCount: 76,
      days: 10,
      isBookmarked: false
    },
    {
      _id: '3',
      tripSlug: 'safari-adventure',
      image: '/png/P3.png',
      title: 'African Safari & Wildlife Tour',
      rating: 4.7,
      location: 'Kenya',
      price: 4199,
      reviewCount: 65,
      days: 14,
      isBookmarked: false
    }
  ],
  activeTrips: [
    {
      _id: '4',
      tripSlug: 'patagonia-trek',
      image: '/png/P4.png',
      title: 'Patagonia Trekking Expedition',
      rating: 4.9,
      location: 'Argentina',
      price: 3799,
      reviewCount: 42,
      days: 11,
      isBookmarked: false
    },
    {
      _id: '5',
      tripSlug: 'iceland-adventure',
      image: '/png/P5.png',
      title: 'Iceland Northern Lights Adventure',
      rating: 4.8,
      location: 'Iceland',
      price: 2899,
      reviewCount: 58,
      days: 8,
      isBookmarked: false
    }
  ],
  pastTrips: [
    {
      _id: '6',
      tripSlug: 'machu-picchu',
      image: '/png/P1.png',
      title: 'Machu Picchu & Inca Trail',
      rating: 4.7,
      location: 'Peru',
      price: 2299,
      reviewCount: 94,
      days: 9,
      isBookmarked: false
    },
    {
      _id: '7',
      tripSlug: 'vietnam-cultural',
      image: '/png/P2.png',
      title: 'Vietnam Cultural Journey',
      rating: 4.6,
      location: 'Vietnam',
      price: 1899,
      reviewCount: 71,
      days: 12,
      isBookmarked: false
    }
  ]
});

const HostProfile = () => {
  const params = useParams();
  const hostId = params.id;

  const hostData = getHostData(hostId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-80 bg-gradient-to-r from-blue-600 to-purple-600">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${hostData.coverImage})` }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <Card className="mb-8 bg-white">
          <CardContent className="p-8">
            <div className="flex flex-row justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-40 h-40 border-4 border-white shadow-xl">
                  <AvatarImage src={hostData.avatar} alt={hostData.name} />
                  <AvatarFallback name={hostData.name} />
                </Avatar>
                <div className="flex flex-col justify-center ">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">{hostData.brandName}</h1>
                  </div>
                  <p className="text-gray-600 mt-1">{hostData.tagline}</p>
                  <div className="flex items-center gap-2 mt-2 text-gray-600 justify-center md:justify-start">
                    <MapPin className="w-4 h-4" />
                    <span>{hostData.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Connect With Host</h3>
                <div className="flex gap-4">
                  {hostData.socialLinks.website && (
                    <a href={hostData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                  {hostData.socialLinks.facebook && (
                    <a href={hostData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {hostData.socialLinks.instagram && (
                    <a href={hostData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {hostData.socialLinks.twitter && (
                    <a href={hostData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-400 hover:text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {hostData.socialLinks.linkedin && (
                    <a href={hostData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-700 hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{hostData.stats.activeTrips}</div>
            <div className="text-sm text-gray-600 mt-1">Active Trips</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{hostData.stats.pastTrips}</div>
            <div className="text-sm text-gray-600 mt-1">Past Trips</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{hostData.stats.totalTravellers}</div>
            <div className="text-sm text-gray-600 mt-1">Total Travellers</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <div className="text-3xl font-bold text-yellow-600">{hostData.stats.averageRating}</div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Average Rating</div>
          </div>
        </div>
        <div className="flex gap-8 mb-8">
          <div className='flex-4'>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>About Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed">{hostData.about}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Our Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {hostData.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Experience</h3>
                  <p className="text-gray-700 leading-relaxed">{hostData.experience}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Beyond This Platform</h3>
                  <p className="text-gray-700 leading-relaxed">{hostData.beyondPlatform}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="my-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  All-Time Top Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hostData.topTrips.map((trip) => (
                    <TripCard key={trip._id} trip={trip} showBookmark={true} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='flex-2 flex flex-col gap-8'>
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex-1 space-y-2">
                  <div>
                    <h1 className='text-5xl font-semibold px-4'>4.8</h1>
                    <div className='flex gap-1 py-2'>
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <h2 className='pb-2 text-gray-500 pl-2'>222 reviews</h2>
                  </div>
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = hostData.reviews.filter(review => review.rating === stars).length;
                    const percentage = (count / hostData.reviews.length) * 100;
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm font-medium">{stars}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-black h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-600 w-8 text-right">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="mb-8 pt-6">
              <CardContent>
                <div className="space-y-6">
                  {hostData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback name={review.userName} />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                              <p className="text-sm text-gray-600">{review.tripName}</p>
                            </div>
                            <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                          </div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="mb-8 !gap-4">
          <CardHeader>
            <CardTitle className='px-8 font-semibold text-2xl'>Active Trips ({hostData.activeTrips.length})</CardTitle>
          </CardHeader>
          <CardContent className='!px-0 !mx-0'>
            <TripSlider trips={hostData.activeTrips} showBookmark={true} className='!py-0'/>
          </CardContent>
        </Card>
        <Card className="mb-8 !gap-4">
          <CardHeader>
            <CardTitle className='px-8 font-semibold text-2xl'>Past Trips ({hostData.pastTrips.length})</CardTitle>
          </CardHeader>
          <CardContent className='!px-0 !mx-0'>
            <TripSlider trips={hostData.pastTrips} showBookmark={true} className='!py-0'/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostProfile;