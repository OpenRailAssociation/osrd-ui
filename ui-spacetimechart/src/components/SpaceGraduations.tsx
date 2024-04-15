import { FC, useCallback } from 'react';

import { DrawingFunction } from '../lib/types';
import { BLUE, GREY_10 } from '../lib/consts';
import { useDraw } from '../hooks/useCanvas';

const STYLES: Record<
  number,
  { width: number; color: string; opacity?: number; dashArray?: number[] }
> = {
  1: {
    width: 0.5,
    color: BLUE,
    opacity: 0.75,
  },
  2: {
    width: 0.5,
    color: BLUE,
    opacity: 0.25,
  },
  3: {
    width: 0.5,
    color: GREY_10,
  },
};

export const SpaceGraduations: FC = () => {
  const drawingFunction = useCallback<DrawingFunction>(
    (ctx, { xOffset, getY, operationalPoints }) => {
      const width = ctx.canvas.width;

      // Draw operational point lines:
      operationalPoints.forEach((point) => {
        const styles = STYLES[point.importanceLevel || 0];
        if (!styles) return;

        ctx.strokeStyle = styles.color;
        ctx.lineWidth = styles.width;
        ctx.globalAlpha = styles.opacity || 1;
        if (styles.dashArray) {
          ctx.setLineDash(styles.dashArray || []);
          ctx.lineDashOffset = -xOffset;
        }

        const y = getY(point.position);
        if (typeof y !== 'number') return;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      });

      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;
      ctx.globalAlpha = 1;
    },
    []
  );

  useDraw('graduations', drawingFunction);

  return null;
};

export default SpaceGraduations;
