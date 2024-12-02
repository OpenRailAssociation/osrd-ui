import {
  OCCUPANCY_ZONE_START,
  MINUTES_TEXT_OFFSET,
  STATION_TEXT_OFFSET,
  FONTS,
  COLORS,
} from '../../consts';
import { drawText } from '../../utils';

const BREAKPOINTS = {
  medium: 24,
  small: 4,
};
const STROKE_WIDTH = 4;
const X_INITIAL_POSITION_OFFSET = 8;
const Y_INITIAL_POSITION_OFFSET = 5;
const Y_MEDIUM_POSITION_OFFSET = 14;

const { SANS, MONO } = FONTS;
const { WHITE_100, GREY_50, GREY_60, GREY_80 } = COLORS;

export const drawOccupancyZonesTexts = ({
  ctx,
  zone,
  arrivalTime,
  departureTime,
  isThroughTrain,
}: {
  ctx: CanvasRenderingContext2D;
  zone: {
    arrivalTrainName: string;
    arrivalTime: Date;
    departureTime: Date;
    originStation?: string;
    destinationStation?: string;
  };
  arrivalTime: number;
  departureTime: number;
  isThroughTrain: boolean;
}) => {
  const zoneOccupancyLength = departureTime - arrivalTime - STROKE_WIDTH;

  const isBelowBreakpoint = (breakpoint: keyof typeof BREAKPOINTS) =>
    zoneOccupancyLength < BREAKPOINTS[breakpoint];

  const textLength = ctx.measureText(zone.originStation!).width;
  const { xName, yName } = {
    xName: isBelowBreakpoint('medium')
      ? arrivalTime - textLength + STROKE_WIDTH
      : arrivalTime + X_INITIAL_POSITION_OFFSET,
    yName: isBelowBreakpoint('medium')
      ? OCCUPANCY_ZONE_START - Y_MEDIUM_POSITION_OFFSET
      : OCCUPANCY_ZONE_START - Y_INITIAL_POSITION_OFFSET,
  };
  const xArrivalPosition = isBelowBreakpoint('small') ? 'right' : 'center';
  const xDeparturePosition = isBelowBreakpoint('small') ? 'left' : 'center';

  const textStroke = {
    color: WHITE_100,
    width: STROKE_WIDTH,
  };

  // train name
  drawText({
    ctx,
    text: zone.arrivalTrainName,
    x: xName,
    y: yName,
    color: GREY_50,
    rotateAngle: -30,
    stroke: textStroke,
  });

  // arrival minutes & departure minutes
  drawText({
    ctx,
    text: zone.arrivalTime.getMinutes().toLocaleString('fr-FR', { minimumIntegerDigits: 2 }),
    x: arrivalTime,
    y: OCCUPANCY_ZONE_START + MINUTES_TEXT_OFFSET,
    color: GREY_80,
    xPosition: xArrivalPosition,
    yPosition: 'top',
    font: SANS,
    stroke: textStroke,
  });

  if (!isThroughTrain)
    drawText({
      ctx,
      text: zone.departureTime.getMinutes().toLocaleString('fr-FR', { minimumIntegerDigits: 2 }),
      x: departureTime,
      y: OCCUPANCY_ZONE_START + MINUTES_TEXT_OFFSET,
      color: GREY_80,
      xPosition: xDeparturePosition,
      yPosition: 'top',
      font: '400 12px IBM Plex Sans',
      stroke: textStroke,
    });

  // origin & destination
  drawText({
    ctx,
    text: zone.originStation!,
    x: arrivalTime,
    y: OCCUPANCY_ZONE_START - STATION_TEXT_OFFSET,
    color: GREY_60,
    xPosition: 'right',
    yPosition: 'bottom',
    font: MONO,
    stroke: textStroke,
  });

  drawText({
    ctx,
    text: zone.destinationStation!,
    x: departureTime,
    y: OCCUPANCY_ZONE_START - STATION_TEXT_OFFSET,
    color: GREY_60,
    xPosition: 'left',
    yPosition: 'bottom',
    font: MONO,
    stroke: textStroke,
  });
};
