import { useCallback } from 'react';

import { useDraw } from '../hooks/useCanvas';
import { MINUTE } from '../lib/consts';
import { type DrawingFunction } from '../lib/types';

const MINUTES_FORMATTER = (t: number) => `:${new Date(t).getMinutes().toString().padStart(2, '0')}`;
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

export const CAPTION_SIZE = 33;
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

const TimeCaptions = () => {
  const drawingFunction = useCallback<DrawingFunction>(
    (
      ctx,
      {
        timeScale,
        timeOrigin,
        timePixelOffset,
        getTimePixel,
        swapAxis,
        width,
        height,
        theme: {
          background,
          breakpoints,
          timeRanges,
          timeCaptionsPriorities,
          timeCaptionsStyles,
          timeGraduationsStyles,
        },
      }
    ) => {
      const timeAxisSize = !swapAxis ? width : height;
      const spaceAxisSize = !swapAxis ? height : width;
      const minT = timeOrigin - timeScale * timePixelOffset;
      const maxT = minT + timeScale * width;

      // Find which styles to apply, relatively to the timescale (i.e. horizontal zoom level):
      const pixelsPerMinute = (1 / timeScale) * MINUTE;
      let labelLevels: number[] = [];

      breakpoints.some((breakpoint, i) => {
        if (pixelsPerMinute < breakpoint) {
          labelLevels = timeCaptionsPriorities[i];
          return true;
        }
        return false;
      });

      // - Keys are times in ms
      // - Values are the highest level on each time
      const labelMarks: Record<number, { level: number; rangeIndex: number }> = {};
      timeRanges.map((range, i) => {
        const labelLevel = labelLevels[i];

        if (!labelLevel) return;

        let t = Math.floor(minT / range) * range;
        while (t <= maxT) {
          if (labelLevel) labelMarks[t] = { level: labelLevel, rangeIndex: i };
          t += range;
        }
      });

      // Render caption background:
      ctx.fillStyle = background;
      if (!swapAxis) {
        ctx.fillRect(0, spaceAxisSize - CAPTION_SIZE, timeAxisSize, CAPTION_SIZE);
      } else {
        ctx.fillRect(0, 0, CAPTION_SIZE, timeAxisSize);
      }

      // Render caption top border:
      ctx.strokeStyle = timeGraduationsStyles[1].color;
      ctx.lineWidth = timeGraduationsStyles[1].width;
      ctx.beginPath();
      if (!swapAxis) {
        ctx.moveTo(0, spaceAxisSize - CAPTION_SIZE);
        ctx.lineTo(timeAxisSize, spaceAxisSize - CAPTION_SIZE);
      } else {
        ctx.moveTo(CAPTION_SIZE, 0);
        ctx.lineTo(CAPTION_SIZE, timeAxisSize);
      }
      ctx.stroke();

      // Render time captions:
      for (const t in labelMarks) {
        const { level, rangeIndex } = labelMarks[t];
        const styles = timeCaptionsStyles[level];
        const formatter = RANGES_FORMATER[rangeIndex];
        const text = formatter(+t, pixelsPerMinute);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = styles.color;
        ctx.font = `${styles.fontWeight || 'normal'} ${styles.font}`;
        if (!swapAxis) {
          ctx.fillText(
            text,
            getTimePixel(+t),
            spaceAxisSize - CAPTION_SIZE + (styles.topOffset || 0)
          );
        } else {
          ctx.save();
          ctx.translate(CAPTION_SIZE - (styles.topOffset || 0), getTimePixel(+t));
          ctx.rotate(Math.PI / 2);
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }
    },
    []
  );

  useDraw('captions', drawingFunction);

  return null;
};

export default TimeCaptions;
