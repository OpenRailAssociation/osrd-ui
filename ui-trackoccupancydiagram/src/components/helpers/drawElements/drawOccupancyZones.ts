import { drawOccupancyZonesTexts } from './drawOccupancyZonesTexts';
import {
  TRACK_HEIGHT_CONTAINER,
  CANVAS_PADDING,
  OCCUPANCY_ZONE_START,
  OCCUPANCY_ZONE_HEIGHT,
  COLORS,
} from '../../consts';
import type { OccupancyZone, Track } from '../../types';

type DrawZone = {
  ctx: CanvasRenderingContext2D;
  arrivalTime: number;
  departureTime: number;
};

const drawDefaultZone = ({ ctx, arrivalTime, departureTime }: DrawZone) => {
  ctx.beginPath();
  ctx.rect(arrivalTime, OCCUPANCY_ZONE_START, departureTime! - arrivalTime, OCCUPANCY_ZONE_HEIGHT);
  ctx.fill();
  ctx.stroke();
};

const ARROW_OFFSET_X = 1;
const ARROW_OFFSET_Y = 1.5;
const ARROW_WIDTH = 4.5;
const ARROW_TOP_Y = 3.5;
const ARROW_BOTTOM_Y = 6.5;

const drawThroughTrain = ({ ctx, arrivalTime }: Omit<DrawZone, 'departureTime'>) => {
  ctx.beginPath();
  ctx.moveTo(arrivalTime - ARROW_OFFSET_X, OCCUPANCY_ZONE_START + ARROW_OFFSET_Y);
  ctx.lineTo(arrivalTime - ARROW_WIDTH, OCCUPANCY_ZONE_START - ARROW_TOP_Y);
  ctx.lineTo(arrivalTime + ARROW_WIDTH, OCCUPANCY_ZONE_START - ARROW_TOP_Y);
  ctx.lineTo(arrivalTime + ARROW_OFFSET_X, OCCUPANCY_ZONE_START + ARROW_OFFSET_Y);
  ctx.lineTo(arrivalTime + ARROW_WIDTH, OCCUPANCY_ZONE_START + ARROW_BOTTOM_Y);
  ctx.lineTo(arrivalTime - ARROW_WIDTH, OCCUPANCY_ZONE_START + ARROW_BOTTOM_Y);
  ctx.lineTo(arrivalTime - ARROW_OFFSET_X, OCCUPANCY_ZONE_START + ARROW_OFFSET_Y);
  ctx.fill();
  ctx.moveTo(arrivalTime - ARROW_OFFSET_X, OCCUPANCY_ZONE_START + ARROW_OFFSET_Y);
  ctx.lineTo(arrivalTime + ARROW_OFFSET_X, OCCUPANCY_ZONE_START + ARROW_OFFSET_Y);
  ctx.stroke();
};

export const drawOccupancyZones = ({
  ctx,
  width,
  height,
  tracks,
  occupancyZones,
  getTimePixel,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  tracks: Track[] | undefined;
  occupancyZones: OccupancyZone[] | undefined;
  getTimePixel: (time: number) => number;
}) => {
  ctx.clearRect(0, 0, width, height);

  tracks?.forEach((track, index) => {
    const trackTranslate = index === 0 ? CANVAS_PADDING : TRACK_HEIGHT_CONTAINER;
    ctx.translate(0, trackTranslate);

    const trackOccupancyZones = occupancyZones?.filter((zone) => zone.trackId === track.id);

    if (!trackOccupancyZones) return;

    trackOccupancyZones.forEach((zone) => {
      const arrivalTime = getTimePixel(zone.arrivalTime.getTime());
      const departureTime = getTimePixel(zone.departureTime.getTime());
      const isThroughTrain = arrivalTime === departureTime;

      ctx.fillStyle = zone.color;
      ctx.strokeStyle = COLORS.WHITE_100;
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      if (isThroughTrain) {
        drawThroughTrain({ ctx, arrivalTime });
      } else {
        drawDefaultZone({ ctx, arrivalTime, departureTime });
      }
      drawOccupancyZonesTexts({
        ctx,
        zone,
        arrivalTime,
        departureTime,
        isThroughTrain,
      });
    });
  });
};
