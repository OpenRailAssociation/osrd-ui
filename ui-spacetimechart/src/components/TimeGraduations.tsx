import { type FC, useCallback } from 'react';

import { useDraw } from '../hooks/useCanvas';
import { MINUTE } from '../lib/consts';
import { type DrawingFunction } from '../lib/types';

const TimeGraduations: FC = () => {
  const drawingFunction = useCallback<DrawingFunction>(
    (
      ctx,
      {
        timeScale,
        timeOrigin,
        timePixelOffset,
        spacePixelOffset,
        getTimePixel,
        swapAxis,
        width,
        height,
        theme: { breakpoints, timeRanges, timeGraduationsStyles, timeGraduationsPriorities },
      }
    ) => {
      const timeAxisSize = !swapAxis ? width : height;
      const spaceAxisSize = !swapAxis ? height : width;
      const minT = timeOrigin - timeScale * timePixelOffset;
      const maxT = minT + timeScale * timeAxisSize;

      // Find which styles to apply, relatively to the timescale (i.e. horizontal zoom level):
      const pixelsPerMinute = (1 / timeScale) * MINUTE;
      let gridlinesLevels: number[] = [];

      breakpoints.some((breakpoint, i) => {
        if (pixelsPerMinute < breakpoint) {
          gridlinesLevels = timeGraduationsPriorities[i];
          return true;
        }
        return false;
      });

      // - Keys are times in ms
      // - Values are the highest level on each time
      const gridMarks: Record<number, number> = {};
      timeRanges.map((range, i) => {
        const gridlinesLevel = gridlinesLevels[i];

        if (!gridlinesLevel) return;

        let t = Math.floor(minT / range) * range;
        while (t <= maxT) {
          gridMarks[t] = gridlinesLevel;
          t += range;
        }
      });

      // Render grid lines:
      for (const t in gridMarks) {
        const gridlinesLevel = gridMarks[t];
        const styles = timeGraduationsStyles[gridlinesLevel];

        ctx.strokeStyle = styles.color;
        ctx.lineWidth = styles.width;
        ctx.globalAlpha = styles.opacity || 1;
        ctx.setLineDash(styles.dashArray || []);
        if (styles.dashArray) {
          ctx.lineDashOffset = -spacePixelOffset;
        }

        const timePixel = getTimePixel(+t);
        ctx.beginPath();
        if (!swapAxis) {
          ctx.moveTo(timePixel, 0);
          ctx.lineTo(timePixel, spaceAxisSize);
        } else {
          ctx.moveTo(0, timePixel);
          ctx.lineTo(spaceAxisSize, timePixel);
        }
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;
      ctx.globalAlpha = 1;
    },
    []
  );

  useDraw('graduations', drawingFunction);

  return null;
};

export default TimeGraduations;
