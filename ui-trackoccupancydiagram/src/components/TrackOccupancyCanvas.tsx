import React from 'react';

import OccupancyZonesLayer from './layers/OccupancyZonesLayer';
import TracksLayer from './layers/TracksLayer';
import { type TrackOccupancyCanvasProps } from './types';

new FontFace('IBM Plex Mono', 'url(/assets/IBMPlexMono-Regular.ttf)').load().then((result) => {
  document.fonts.add(result);
});

const TrackOccupancyCanvas = ({
  opId,
  useDraw,
  setCanvasesRoot,
  selectedTrainId,
}: TrackOccupancyCanvasProps) => (
  <div
    id={`track-occupancy-canvas-${opId}`}
    className="bg-white-100 canvas-container"
    ref={setCanvasesRoot}
  >
    <TracksLayer useDraw={useDraw} />
    <OccupancyZonesLayer useDraw={useDraw} selectedTrainId={selectedTrainId} />
  </div>
);

export default TrackOccupancyCanvas;
