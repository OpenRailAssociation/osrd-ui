import React from 'react';

import { type TrackOccupancyManchetteProps } from './types';

const TrackOccupancyManchette = ({ tracks }: TrackOccupancyManchetteProps) => {
  console.warn('tracks:', tracks);

  return <div id="trackOccupancyManchette"></div>;
};

export default TrackOccupancyManchette;
