import React from 'react';

import OccupancyZonesLayer from './layers/OccupancyZonesLayer';
import TracksLayer from './layers/TracksLayer';
import { type TrackOccupancyCanvasProps } from './types';

new FontFace('IBM Plex Mono', 'url(/assets/IBMPlexMono-Regular.ttf)').load().then((result) => {
  document.fonts.add(result);
});

const TrackOccupancyCanvas = ({ useDraw, setCanvasesRoot }: TrackOccupancyCanvasProps) => (
  <div id="track-occupancy-canvas" className="bg-white-100" ref={setCanvasesRoot}>
    <TracksLayer useDraw={useDraw} />
    <OccupancyZonesLayer useDraw={useDraw} />
  </div>
);

export default TrackOccupancyCanvas;
