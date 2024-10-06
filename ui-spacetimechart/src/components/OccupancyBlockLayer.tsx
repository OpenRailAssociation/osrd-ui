import { useCallback } from 'react';

import { useDraw } from '../hooks/useCanvas';
import { type DrawingFunction } from '../lib/types';

export type OccupancyBlock = {
  timeStart: number;
  timeEnd: number;
  spaceStart: number;
  spaceEnd: number;
  color: string;
};

export type OccupancyBlockLayerProps = {
  occupancyBlocks: OccupancyBlock[];
};

export const OccupancyBlockLayer = ({ occupancyBlocks }: OccupancyBlockLayerProps) => {
  const drawOccupancyBlockLayer = useCallback<DrawingFunction>(
    (ctx, { getTimePixel, getSpacePixel }) => {
      for (const occupancyBlock of occupancyBlocks) {
        const x = getTimePixel(occupancyBlock.timeStart);
        const y = getSpacePixel(occupancyBlock.spaceStart);
        const width = getTimePixel(occupancyBlock.timeEnd) - x;
        const height = getSpacePixel(occupancyBlock.spaceEnd) - y;

        ctx.fillStyle = occupancyBlock.color;
        ctx.fillRect(x, y, width, height);
      }
    },
    [occupancyBlocks]
  );

  useDraw('background', drawOccupancyBlockLayer);

  return null;
};
