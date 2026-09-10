import React from 'react';
import TripSearchCard from './TripSearchCard';
import { Trip } from '../types';

interface TripListProps {
  trips: Trip[];
}

/**
 * Two cards per row from `xl`, one below it.
 *
 * The horizontal card needs roughly 400px to hold an image plus a readable detail column.
 * Subtracting the page padding, the 288px filter rail and the gaps, a viewport only clears
 * that at ~1280px — at 1024px two cards would be 296px each and the detail column would
 * collapse to about 150px.
 */
const TripList: React.FC<TripListProps> = ({ trips }) => (
  // No gap — the cards butt up against each other; their own p-3 keeps the content apart.
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
    {trips.map((trip, index) => (
      <TripSearchCard key={`${trip.slug}-${index}`} trip={trip} index={index} />
    ))}
  </div>
);

export default TripList;
