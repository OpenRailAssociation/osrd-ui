import { sum } from 'lodash';

import { timeScaleSample } from '../../../sample/timeScale';
import { TRACK_HEIGHT_CONTAINER, COLORS } from '../../consts';

type DrawTrackProps = {
  ctx: CanvasRenderingContext2D;
  width: number;
  getTimePixel: (time: number) => number;
};

const TICKS_PATTERN = {
  MINUTE: [2, 9, 2],
  FIVE_MINUTES: [6, 9, 6],
  QUARTER_HOUR: [2, 2, 6, 9, 6, 2, 2],
  HALF_HOUR: [2, 2, 2, 2, 6, 9, 6, 2, 2, 2, 2],
  HOUR: [16, 9, 16],
};

const { WHITE_50, GREY_20, RAIL_TICK } = COLORS;

const drawRails = ({
  xStart,
  yStart,
  width,
  stroke = GREY_20,
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
  ctx.fillStyle = WHITE_50;
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

export const drawTrack = ({ ctx, width, getTimePixel }: DrawTrackProps) => {
  ctx.save();

  drawRails({ xStart: -1, yStart: TRACK_HEIGHT_CONTAINER / 2 - 4, width: width + 1, ctx });

  timeScaleSample.forEach((time) => {
    const date = new Date(+time);
    const minutes = date.getMinutes().toString().padStart(2, '0');

    type TickPattern = keyof typeof TICKS_PATTERN;
    let tickPattern: TickPattern = 'MINUTE';
    switch (minutes) {
      case '00':
        tickPattern = 'HOUR';
        break;
      case '30':
        tickPattern = 'HALF_HOUR';
        break;
      case '15':
      case '45':
        tickPattern = 'QUARTER_HOUR';
        break;
      case '05':
      case '10':
      case '20':
      case '25':
      case '35':
      case '40':
      case '50':
      case '55':
        tickPattern = 'FIVE_MINUTES';
        break;
      default:
        tickPattern = 'MINUTE';
        break;
    }

    drawTick({
      ctx,
      xStart: getTimePixel(+time),
      yStart: TRACK_HEIGHT_CONTAINER / 2,
      ticks: TICKS_PATTERN[tickPattern],
      stroke: RAIL_TICK,
    });
  });

  ctx.restore();
};
