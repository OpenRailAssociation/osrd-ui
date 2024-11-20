import React from 'react';

import type { Store, TrackOccupancyCanvasProps } from './types';

const TrackOccupancyCanvas = ({
  zones,
  selectedTrain,
  timeOrigin,
  timeScale,
}: TrackOccupancyCanvasProps) => {
  const store: Store = {
    zones,
    selectedTrain,
    timeOrigin,
    timeScale,
    ratio: 0,
    offsetX: 0,
    clientX: 0,
    clientY: 0,
  };

  console.warn(
    'zones:',
    zones,
    'selectedTrain:',
    selectedTrain,
    'timeOrigin:',
    timeOrigin,
    'timeScale:',
    timeScale,
    'store:',
    store
  );

  return <div id="trackOccupancyCanvas"></div>;
};

export default TrackOccupancyCanvas;
