import React from 'react';

import OccupancyZonesLayer from './layers/OccupancyZonesLayer';
import TracksLayer from './layers/TracksLayer';
import { type TrackOccupancyCanvasProps } from './types';

const TrackOccupancyCanvas = ({ useDraw, setCanvasesRoot }: TrackOccupancyCanvasProps) => (
  <div id="track-occupancy-canvas" className="bg-white-100" ref={setCanvasesRoot}>
    <TracksLayer useDraw={useDraw} />
    <OccupancyZonesLayer />
  </div>
);

export default TrackOccupancyCanvas;
