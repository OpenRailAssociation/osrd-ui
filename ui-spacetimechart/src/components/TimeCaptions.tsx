import { FC, useCallback } from 'react';

import { DrawingFunction } from '../lib/types';
import { BREAKPOINTS, MINUTE, TIME_RANGES, FONT, GREY_30, GREY_50 } from '../lib/consts';
import { useDraw } from '../hooks/useCanvas';

// The following matrix indicate, for various zoom levels, what time marks should be represented,
// and with which priority level:
// - Each line corresponds to a breakpoint, in the same order as in the BREAKPOINTS array
// - Each column corresponds to a time range, in the same order as in the TIME_RANGES array
const LABELS_PRIORITIES = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
  [0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1],
  [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
];

const MINUTES_FORMATTER = (t: number) => {
  return `:${new Date(t).getMinutes().toString().padStart(2, '0')}`;
};
const HOURS_FORMATTER = (t: number, pixelsPerMinute: number) => {
  const date = new Date(t);
  if (pixelsPerMinute > 1) {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    return date.getUTCHours().toString().padStart(2, '0');
  }
};

export const CAPTION_HEIGHT = 33;
const RANGES_FORMATER: ((t: number, pixelsPerMinute: number) => string)[] = [
  () => '',
  () => '',
  MINUTES_FORMATTER,
  MINUTES_FORMATTER,
  MINUTES_FORMATTER,
  MINUTES_FORMATTER,
  HOURS_FORMATTER,
  HOURS_FORMATTER,
  HOURS_FORMATTER,
  HOURS_FORMATTER,
  HOURS_FORMATTER,
];
const STYLES: Record<
  number,
  {
    color: string;
    fontSize: number;
    fontWeight?: string;
    topOffset?: number;
  }
> = {
  1: {
    color: GREY_50,
    fontSize: 12,
    topOffset: 11,
  },
  2: {
    color: GREY_30,
    fontSize: 12,
    topOffset: 9,
  },
  3: {
    color: GREY_30,
    fontSize: 10,
    topOffset: 6,
  },
  4: {
    color: GREY_30,
    fontSize: 8,
    topOffset: 8,
  },
};

export const TimeCaptions: FC = () => {
  const drawingFunction = useCallback<DrawingFunction>(
    (ctx, { timeScale, timeOrigin, xOffset, getX }) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const minT = timeOrigin - timeScale * xOffset;
      const maxT = minT + timeScale * width;

      // Find which styles to apply, relatively to the timescale (i.e. horizontal zoom level):
      const pixelsPerMinute = (1 / timeScale) * MINUTE;
      let labelLevels: number[] = [];

      BREAKPOINTS.some((breakpoint, i) => {
        if (pixelsPerMinute < breakpoint) {
          labelLevels = LABELS_PRIORITIES[i];
          return true;
        }
        return false;
      });

      // - Keys are times in ms
      // - Values are the highest level on each time
      const labelMarks: Record<number, { level: number; rangeIndex: number }> = {};
      TIME_RANGES.map((range, i) => {
        const labelLevel = labelLevels[i];

        if (!labelLevel) return;

        let t = Math.floor(minT / range) * range;
        while (t <= maxT) {
          if (labelLevel) labelMarks[t] = { level: labelLevel, rangeIndex: i };
          t += range;
        }
      });

      // Render caption background:
      ctx.fillStyle = 'white';
      ctx.fillRect(0, height - CAPTION_HEIGHT, width, height);

      // Render caption top border:
      ctx.strokeStyle = '#979797';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height - CAPTION_HEIGHT);
      ctx.lineTo(width, height - CAPTION_HEIGHT);
      ctx.stroke();

      // Render time captions:
      for (const t in labelMarks) {
        const { level, rangeIndex } = labelMarks[t];
        const styles = STYLES[level];
        const formatter = RANGES_FORMATER[rangeIndex];
        const text = formatter(+t, pixelsPerMinute);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = styles.color;
        ctx.font = `${styles.fontWeight || 'normal'} ${styles.fontSize}px ${FONT}`;
        ctx.fillText(text, getX(+t), height - CAPTION_HEIGHT + (styles.topOffset || 0));
      }
    },
    []
  );

  useDraw('captions', drawingFunction);

  return null;
};

export default TimeCaptions;
