import { drawOccupancyZonesTexts } from './drawOccupancyZonesTexts';
import {
  TRACK_HEIGHT_CONTAINER,
  CANVAS_PADDING,
  OCCUPANCY_ZONE_START,
  OCCUPANCY_ZONE_HEIGHT,
} from '../../consts';
import type { OccupancyZone, Track } from '../../types';

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

    const filteredOccupancyZone = occupancyZones?.filter((zone) => zone.trackId === track.id);

    if (filteredOccupancyZone) {
      filteredOccupancyZone.forEach((zone) => {
        const arrivalTime = getTimePixel(zone.arrivalTime.getTime());
        const departureTime = getTimePixel(zone.departureTime.getTime());

        ctx.fillStyle = zone.color;
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(
          arrivalTime,
          OCCUPANCY_ZONE_START,
          departureTime - arrivalTime,
          OCCUPANCY_ZONE_HEIGHT
        );
        ctx.fill();
        ctx.stroke();

        drawOccupancyZonesTexts({
          ctx,
          zone,
          arrivalTime,
          departureTime,
        });
      });
    }
  });
};
