import React, { useState } from 'react';

import OccupancyZonesLayer from './layers/OccupancyZonesLayer';
import TracksLayer from './layers/TracksLayer';
import type { Store, TrackOccupancyCanvasProps } from './types';

const TrackOccupancyCanvas = ({
  tracks,
  zones,
  selectedTrain,
  timeOrigin,
  timeScale,
}: TrackOccupancyCanvasProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [store, setStore] = useState<Store>({
    tracks,
    zones,
    selectedTrain,
    timeOrigin,
    timeScale,
    ratio: 0,
    offsetX: 0,
    clientX: 0,
    clientY: 0,
  });

  return (
    <div id="track-occupancy-canvas" className="bg-white-100">
      <TracksLayer />
      <OccupancyZonesLayer />
    </div>
  );
};

export default TrackOccupancyCanvas;
