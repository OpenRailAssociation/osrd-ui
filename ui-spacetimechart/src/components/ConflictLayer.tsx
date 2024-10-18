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

const BORDER_SIZE = 4;
const BORDERS = [
  { opacity: 0.33, color: '#d91c1c', size: 2 * BORDER_SIZE },
  { opacity: 0.5, color: '#ff6868', size: BORDER_SIZE },
  { opacity: 1, color: '#6b0000', size: 0 },
];

export const ConflictLayer = ({ conflicts }: ConflictLayerProps) => {
  const drawConflictLayer = useCallback<DrawingFunction>(
    (ctx, { getTimePixel, getSpacePixel }) => {
      const paths = BORDERS.map(() => new Path2D());
      for (const conflict of conflicts) {
        const x = getTimePixel(conflict.timeStart);
        const y = getSpacePixel(conflict.spaceStart);
        const width = getTimePixel(conflict.timeEnd) - x;
        const height = getSpacePixel(conflict.spaceEnd) - y;
        for (let i = 0; i < BORDERS.length; i++) {
          const border = BORDERS[i].size;
          paths[i].rect(x - border, y - border, width + 2 * border, height + 2 * border);
        }
      }

      for (let i = 0; i < BORDERS.length; i++) {
        ctx.fillStyle = BORDERS[i].color;
        ctx.globalAlpha = BORDERS[i].opacity;
        ctx.fill(paths[i]);
      }
    },
    [conflicts]
  );

  useDraw('paths', drawConflictLayer);

  return null;
};
