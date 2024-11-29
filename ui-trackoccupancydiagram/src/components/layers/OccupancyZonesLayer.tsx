import { useCallback } from 'react';

import {
  type LayerType,
  type DrawingFunction,
} from '@osrd-project/ui-spacetimechart/src/lib/types';

import { drawOccupancyZones } from '../helpers/drawElements/drawOccupancyZones';

const OccupancyZonesLayer = ({
  useDraw,
}: {
  useDraw: (layer: LayerType, fn: DrawingFunction) => void;
}) => {
  const drawingFunction = useCallback<DrawingFunction>(
    (ctx, { getTimePixel, tracks, occupancyZones, trackOccupancyWidth, trackOccupancyHeight }) => {
      if (trackOccupancyHeight && trackOccupancyWidth)
        drawOccupancyZones({
          ctx,
          width: trackOccupancyWidth,
          height: trackOccupancyHeight,
          tracks,
          occupancyZones,
          getTimePixel,
        });
    },
    []
  );

  useDraw('paths', drawingFunction);

  return null;
};

export default OccupancyZonesLayer;
