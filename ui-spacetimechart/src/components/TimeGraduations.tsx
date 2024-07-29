import { type FC, useCallback } from 'react';

import { useDraw } from '../hooks/useCanvas';
import { BREAKPOINTS, MINUTE, TIME_RANGES, BLACK, BLUE } from '../lib/consts';
import { type DrawingFunction } from '../lib/types';

// The following matrix indicate, for various zoom levels, what time marks should be represented,
// and with which priority level:
// - Each line corresponds to a breakpoint, in the same order as in the BREAKPOINTS array
// - Each column corresponds to a time range, in the same order as in the TIME_RANGES array
const GRIDLINES_PRIORITIES = [
  [0, 0, 0, 0, 0, 0, 0, 4, 3, 2, 1],
  [0, 0, 0, 0, 0, 0, 4, 3, 3, 2, 1],
  [0, 0, 0, 0, 0, 6, 4, 3, 3, 2, 1],
  [0, 0, 0, 0, 6, 5, 4, 3, 3, 2, 1],
  [0, 0, 0, 6, 5, 4, 3, 2, 2, 2, 1],
  [0, 0, 6, 5, 4, 4, 3, 2, 2, 2, 1],
  [0, 6, 5, 4, 4, 4, 3, 2, 2, 2, 1],
  [6, 0, 5, 4, 4, 4, 3, 2, 2, 2, 1],
];

const STYLES: Record<
  number,
  { width: number; color: string; opacity?: number; dashArray?: number[] }
> = {
  1: {
    width: 0.5,
    color: BLACK,
  },
  2: {
    width: 0.5,
    color: BLUE,
    opacity: 0.77,
  },
  3: {
    width: 0.5,
    color: BLUE,
    opacity: 0.5,
  },
  4: {
    width: 0.5,
    color: BLUE,
    opacity: 0.5,
    dashArray: [6, 6],
  },
  5: {
    width: 0.5,
    color: BLUE,
    opacity: 0.5,
    dashArray: [6, 18],
  },
  6: {
    width: 1,
    color: BLUE,
    opacity: 0.5,
    dashArray: [1, 12],
  },
};

export const TimeGraduations: FC = () => {
  const drawingFunction = useCallback<DrawingFunction>(
    (ctx, { timeScale, timeOrigin, xOffset, yOffset, getX }) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const minT = timeOrigin - timeScale * xOffset;
      const maxT = minT + timeScale * width;

      // Find which styles to apply, relatively to the timescale (i.e. horizontal zoom level):
      const pixelsPerMinute = (1 / timeScale) * MINUTE;
      let gridlinesLevels: number[] = [];

      BREAKPOINTS.some((breakpoint, i) => {
        if (pixelsPerMinute < breakpoint) {
          gridlinesLevels = GRIDLINES_PRIORITIES[i];
          return true;
        }
        return false;
      });

      // - Keys are times in ms
      // - Values are the highest level on each time
      const gridMarks: Record<number, number> = {};
      TIME_RANGES.map((range, i) => {
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
        const styles = STYLES[gridlinesLevel];

        ctx.strokeStyle = styles.color;
        ctx.lineWidth = styles.width;
        ctx.globalAlpha = styles.opacity || 1;
        ctx.setLineDash(styles.dashArray || []);
        if (styles.dashArray) {
          ctx.lineDashOffset = -yOffset;
        }

        const x = getX(+t) as number;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
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
