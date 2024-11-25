import { sum } from 'lodash';

import { TRACK_HEIGHT_CONTAINER, COLORS, TICKS_PATTERN } from '../../consts';
import { getTickPattern } from '../../utils';

const drawRails = ({
  xStart,
  yStart,
  width,
  stroke = '#D3D1CF',
  ctx,
}: {
  xStart: number;
  yStart: number;
  width: number;
  stroke?: string;
  ctx: CanvasRenderingContext2D;
}) => {
  ctx.clearRect(xStart, yStart, width, 9);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.rect(xStart, yStart, width, 8);
  ctx.fill();
  ctx.stroke();
};

const drawTick = ({
  ctx,
  xStart,
  yStart,
  ticks,
  stroke,
}: {
  ctx: CanvasRenderingContext2D;
  xStart: number;
  yStart: number;
  ticks: number[];
  stroke: string;
}) => {
  ctx.beginPath();
  ctx.setLineDash(ticks);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.moveTo(xStart, yStart - sum(ticks) / 2);
  ctx.lineTo(xStart, yStart + sum(ticks) / 2);
  ctx.stroke();
};

type DrawTrackProps = {
  ctx: CanvasRenderingContext2D;
  width: number;
  getTimePixel: (time: number) => number;
  labelMarks: Record<number, { level: number; rangeIndex: number }>;
};

export const drawTrack = ({ ctx, width, getTimePixel, labelMarks }: DrawTrackProps) => {
  ctx.save();

  drawRails({ xStart: -1, yStart: TRACK_HEIGHT_CONTAINER / 2 - 4, width: width + 1, ctx });

  for (const t in labelMarks) {
    const date = new Date(+t);
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const tickPattern = getTickPattern(minutes);

    drawTick({
      ctx,
      xStart: getTimePixel(+t),
      yStart: TRACK_HEIGHT_CONTAINER / 2,
      ticks: TICKS_PATTERN[tickPattern],
      stroke: '#2170B9',
    });
  }

  ctx.restore();
};
