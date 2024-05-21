import { type FC, useCallback } from 'react';

import { useDraw } from '../hooks/useCanvas';
import { BLUE, GREY_10 } from '../lib/consts';
import { type DrawingFunction } from '../lib/types';

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

const SpaceGraduations: FC = () => {
  const drawingFunction = useCallback<DrawingFunction>(
    (ctx, { timePixelOffset, getSpacePixel, operationalPoints, swapAxis, width, height }) => {
      const axisSize = !swapAxis ? width : height;

      // Draw operational point lines:
      operationalPoints.forEach((point) => {
        const styles = STYLES[point.importanceLevel || 0];
        if (!styles) return;

        ctx.strokeStyle = styles.color;
        ctx.lineWidth = styles.width;
        ctx.globalAlpha = styles.opacity || 1;
        if (styles.dashArray) {
          ctx.setLineDash(styles.dashArray || []);
          ctx.lineDashOffset = -timePixelOffset;
        }

        const spacePixel = getSpacePixel(point.position);

        ctx.beginPath();
        if (!swapAxis) {
          ctx.moveTo(0, spacePixel);
          ctx.lineTo(axisSize, spacePixel);
        } else {
          ctx.moveTo(spacePixel, 0);
          ctx.lineTo(spacePixel, axisSize);
        }
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
