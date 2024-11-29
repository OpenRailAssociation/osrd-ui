import { OCCUPANCY_ZONE_START, MINUTES_TEXT_OFFSET, STATION_TEXT_OFFSET } from '../../consts';
import { drawText } from '../../utils';

const BREAKPOINTS = {
  medium: 24,
  small: 4,
};
const STROKE_WIDTH = 4;
const X_INITIAL_POSITION_OFFSET = 8;
const Y_INITIAL_POSITION_OFFSET = 5;
const Y_MEDIUM_POSITION_OFFSET = 14;

export const drawOccupancyZonesTexts = ({
  ctx,
  zone,
  arrivalTime,
  departureTime,
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
}) => {
  const zoneOccupancyLength = departureTime - arrivalTime - STROKE_WIDTH;

  const getBreakpoint = (breakpoint: keyof typeof BREAKPOINTS) => {
    if (zoneOccupancyLength < BREAKPOINTS[breakpoint]) {
      return true;
    }
    return false;
  };

  const textLength = ctx.measureText(zone.originStation!).width;
  const { xName, yName } = {
    xName: getBreakpoint('medium')
      ? arrivalTime - textLength + STROKE_WIDTH
      : arrivalTime + X_INITIAL_POSITION_OFFSET,
    yName: getBreakpoint('medium')
      ? OCCUPANCY_ZONE_START - Y_MEDIUM_POSITION_OFFSET
      : OCCUPANCY_ZONE_START - Y_INITIAL_POSITION_OFFSET,
  };
  const xArrivalPosition = getBreakpoint('small') ? 'right' : 'center';
  const xDeparturePosition = getBreakpoint('small') ? 'left' : 'center';

  const textStroke = {
    color: 'rgb(255, 255, 255)',
    width: STROKE_WIDTH,
  };

  // train name
  drawText({
    ctx,
    text: zone.arrivalTrainName,
    x: xName,
    y: yName,
    color: 'rgb(121, 118, 113)',
    rotateAngle: -30,
    stroke: textStroke,
  });

  // arrival minutes & departure minutes
  drawText({
    ctx,
    text: zone.arrivalTime.getMinutes().toLocaleString('fr-FR', { minimumIntegerDigits: 2 }),
    x: arrivalTime,
    y: OCCUPANCY_ZONE_START + MINUTES_TEXT_OFFSET,
    color: 'rgb(92, 89, 85)',
    xPosition: xArrivalPosition,
    yPosition: 'top',
    font: '400 12px IBM Plex Sans',
    stroke: textStroke,
  });

  drawText({
    ctx,
    text: zone.departureTime.getMinutes().toLocaleString('fr-FR', { minimumIntegerDigits: 2 }),
    x: departureTime,
    y: OCCUPANCY_ZONE_START + MINUTES_TEXT_OFFSET,
    color: 'rgb(92, 89, 85)',
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
    color: 'rgb(92, 89, 85)',
    xPosition: 'right',
    yPosition: 'bottom',
    font: `400 10px IBM Plex Mono`,
    stroke: textStroke,
  });

  drawText({
    ctx,
    text: zone.destinationStation!,
    x: departureTime,
    y: OCCUPANCY_ZONE_START - STATION_TEXT_OFFSET,
    color: 'rgb(92, 89, 85)',
    xPosition: 'left',
    yPosition: 'bottom',
    font: `400 10px IBM Plex Mono`,
    stroke: textStroke,
  });
};
