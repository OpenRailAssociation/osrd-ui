import React from 'react';

import { type TrackOccupancyManchetteProps } from './types';

const TrackOccupancyManchette = ({ tracks }: TrackOccupancyManchetteProps) => (
  <div id="track-occupancy-manchette">
    {tracks.map((track) => (
      <div className="track" key={track.id}>
        <span className="track-line">{track.line}</span>
        <div className="track-name">
          <div className="track-name-detail">{track.name}</div>
          <div className="track-name-rail" />
        </div>
      </div>
    ))}
  </div>
);

export default TrackOccupancyManchette;
