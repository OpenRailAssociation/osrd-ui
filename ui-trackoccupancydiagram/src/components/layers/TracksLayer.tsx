import { useCallback } from 'react';

import {
  type LayerType,
  type DrawingFunction,
} from '@osrd-project/ui-spacetimechart/src/lib/types';

import { drawTracks } from '../helpers/drawElements/drawTracks';

const TracksLayer = ({ useDraw }: { useDraw: (layer: LayerType, fn: DrawingFunction) => void }) => {
  const drawingFunction = useCallback<DrawingFunction>(
    (ctx, { getTimePixel, tracks, trackOccupancyWidth, trackOccupancyHeight }) => {
      if (trackOccupancyHeight && trackOccupancyWidth)
        drawTracks({
          ctx,
          width: trackOccupancyWidth,
          height: trackOccupancyHeight,
          tracks,
          getTimePixel,
        });
    },
    []
  );

  useDraw('background', drawingFunction);

  return null;
};

export default TracksLayer;
