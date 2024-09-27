import { useCallback } from 'react';

import { useDraw } from '../hooks/useCanvas';
import { type DrawingFunction } from '../lib/types';

export type PatternRectProps = {
  timeStart: Date;
  timeEnd: Date;
  spaceStart: number; // mm
  spaceEnd: number; // mm
  imageElement: HTMLImageElement;
};

/**
 * draws a repeating pattern in the space time chart
 */
export const PatternRect = ({
  timeStart,
  timeEnd,
  spaceStart,
  spaceEnd,
  imageElement,
}: PatternRectProps) => {
  const drawRegion = useCallback<DrawingFunction>(
    (ctx, { getSpacePixel, getTimePixel, spaceAxis }) => {
      const timeStartPixel = getTimePixel(Number(timeStart));
      const endTimePixel = getTimePixel(Number(timeEnd));
      const spaceStartPixel = getSpacePixel(spaceStart);
      const spaceEndPixel = getSpacePixel(spaceEnd);

      const areaSpaceSize = spaceEndPixel - spaceStartPixel;
      const areaTimeSize = endTimePixel - timeStartPixel;
      if (!areaSpaceSize || !areaTimeSize) return;

      const pattern = ctx.createPattern(imageElement, 'repeat');
      if (!pattern) {
        return;
      }

      ctx.save();
      ctx.fillStyle = pattern;
      if (spaceAxis === 'x') {
        ctx.translate(spaceStartPixel, timeStartPixel);
        ctx.fillRect(0, 0, areaSpaceSize, areaTimeSize);
      } else {
        ctx.translate(timeStartPixel, spaceStartPixel);
        ctx.fillRect(0, 0, areaTimeSize, areaSpaceSize);
      }
      ctx.restore();
    },
    [timeStart, timeEnd, spaceStart, spaceEnd, imageElement]
  );
  useDraw('background', drawRegion);

  return null;
};
