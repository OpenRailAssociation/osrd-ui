import React from 'react';

import type { Track, Waypoint } from '../types';

type TrackOccupancyManchetteProps = {
  tracks: Extract<Waypoint, { tracks: Track }>['tracks'];
};

const TrackOccupancyManchette = ({ tracks }: TrackOccupancyManchetteProps) => (
  <div id="track-occupancy-manchette">
    {tracks.map((track) => (
      <div className="track" key={track.id} style={{ height: 100 }}>
        <span className="track-line">{track.line}</span>
        <div className="track-name">{track.name}</div>
        <div className="track-rail" />
      </div>
    ))}
  </div>
);

export default TrackOccupancyManchette;
