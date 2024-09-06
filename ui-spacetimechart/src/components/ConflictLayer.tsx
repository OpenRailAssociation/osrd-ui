import { useCallback } from 'react';

import { useDraw } from '../hooks/useCanvas';
import { type DrawingFunction } from '../lib/types';

export type Conflict = {
  timeStart: number;
  timeEnd: number;
  spaceStart: number;
  spaceEnd: number;
};

export type ConflictLayerProps = {
  conflicts: Conflict[];
};

export const ConflictLayer = ({ conflicts }: ConflictLayerProps) => {
  const drawConflictLayer = useCallback<DrawingFunction>(
    (ctx, { getTimePixel, getSpacePixel }) => {
      ctx.fillStyle = '#6b0000';
      for (const conflict of conflicts) {
        const x = getTimePixel(conflict.timeStart);
        const y = getSpacePixel(conflict.spaceStart);
        const width = getTimePixel(conflict.timeEnd) - x;
        const height = getSpacePixel(conflict.spaceEnd) - y;
        ctx.fillRect(x, y, width, height);
      }
    },
    [conflicts]
  );

  useDraw('overlay', drawConflictLayer);

  return null;
};
