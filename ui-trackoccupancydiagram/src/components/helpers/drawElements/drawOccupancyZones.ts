import { drawOccupancyZonesTexts } from './drawOccupancyZonesTexts';
import {
  TRACK_HEIGHT_CONTAINER,
  CANVAS_PADDING,
  OCCUPANCY_ZONE_START,
  OCCUPANCY_ZONE_HEIGHT,
  COLORS,
} from '../../consts';
import type { OccupancyZone, Track } from '../../types';

const { REMAINING_TRAINS_BACKGROUND, WHITE_100 } = COLORS;
const REMAINING_TRAINS_WIDTH = 70;
const REMAINING_TRAINS_HEIGHT = 24;
const REMAINING_TEXT_OFFSET = 12;
const Y_OFFSET_INCREMENT = 4;
const MAX_ZONES = 9;

type DrawZone = {
  ctx: CanvasRenderingContext2D;
  arrivalTime: number;
  departureTime: number;
  yPosition: number;
};

const drawDefaultZone = ({ ctx, arrivalTime, departureTime, yPosition }: DrawZone) => {
  ctx.beginPath();
  ctx.rect(arrivalTime, yPosition, departureTime! - arrivalTime, OCCUPANCY_ZONE_HEIGHT);
  ctx.fill();
  ctx.stroke();
};

const ARROW_OFFSET_X = 1;
const ARROW_OFFSET_Y = 1.5;
const ARROW_WIDTH = 4.5;
const ARROW_TOP_Y = 3.5;
const ARROW_BOTTOM_Y = 6.5;

const drawThroughTrain = ({ ctx, arrivalTime }: Omit<DrawZone, 'departureTime' | 'yPosition'>) => {
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

type DrawRemainingTrainsBox = {
  ctx: CanvasRenderingContext2D;
  text: string;
  textX: number;
  textY: number;
};

const drawRemainingTrainsBox = ({ ctx, text, textX, textY }: DrawRemainingTrainsBox) => {
  ctx.fillStyle = REMAINING_TRAINS_BACKGROUND;
  ctx.beginPath();
  ctx.rect(textX, textY, REMAINING_TRAINS_WIDTH, REMAINING_TRAINS_HEIGHT);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = WHITE_100;
  ctx.font = '400 12px IBM Plex Sans';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, textX + REMAINING_TRAINS_WIDTH / 2, textY + REMAINING_TRAINS_HEIGHT / 2);
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

    const filteredOccupancyZone = occupancyZones?.filter((zone) => zone.trackId === track.id);
    const sortedOccupancyZone = filteredOccupancyZone?.sort(
      (a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime()
    );

    if (!sortedOccupancyZone) return;

    let primaryArrivalTimePixel = 0;
    let primaryDepartureTimePixel = 0;
    let lastDepartureTimePixel = 0;
    let yPosition = OCCUPANCY_ZONE_START;
    let yOffset = 0;
    let counter = 0;

    if (sortedOccupancyZone && sortedOccupancyZone.length > 1) {
      primaryArrivalTimePixel = getTimePixel(sortedOccupancyZone[0].arrivalTime.getTime());
      primaryDepartureTimePixel = getTimePixel(sortedOccupancyZone[0].departureTime.getTime());
      lastDepartureTimePixel = primaryDepartureTimePixel;
    }

    // use a for of loop to be able to break the loop if there are more than 9 zones
    for (const [sortedIndex, zone] of sortedOccupancyZone.entries()) {
      const arrivalTime = getTimePixel(zone.arrivalTime.getTime());
      const departureTime = getTimePixel(zone.departureTime.getTime());
      const isThroughTrain = arrivalTime === departureTime;

      // reset the overlap check if the zone is not overlapping
      if (arrivalTime > lastDepartureTimePixel) {
        yPosition = OCCUPANCY_ZONE_START;
        primaryArrivalTimePixel = arrivalTime;
        primaryDepartureTimePixel = departureTime;
        lastDepartureTimePixel = departureTime;
        yOffset = 0;
        counter = 0;
      }

      // figure out if the zone is overlapping with any previous one
      // if so and it's an even index, move it to the bottom, if it's an odd index, move it to the top
      if (arrivalTime >= primaryArrivalTimePixel && arrivalTime < lastDepartureTimePixel) {
        if (counter % 2 === 0) {
          yPosition -= yOffset;
        } else {
          yPosition += yOffset;
        }
        yOffset += Y_OFFSET_INCREMENT;
        counter += 1;
      }

      if (departureTime >= lastDepartureTimePixel) lastDepartureTimePixel = departureTime;

      // draw at least 9 zones and zones texts
      // if there are more than 9 zones, draw a box with the remaining trains
      if (counter <= MAX_ZONES) {
        ctx.fillStyle = zone.color;
        ctx.strokeStyle = WHITE_100;
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        if (isThroughTrain) {
          drawThroughTrain({ ctx, arrivalTime });
        } else {
          drawDefaultZone({ ctx, arrivalTime, departureTime, yPosition });
        }

        drawOccupancyZonesTexts({
          ctx,
          zone,
          arrivalTime,
          departureTime,
          yPosition,
          isThroughTrain,
        });
      } else if (counter === MAX_ZONES + 1) {
        const textX =
          primaryArrivalTimePixel +
          (lastDepartureTimePixel - primaryArrivalTimePixel) / 2 -
          REMAINING_TRAINS_WIDTH / 2;
        const textY = OCCUPANCY_ZONE_START - REMAINING_TEXT_OFFSET;
        const text = `+${sortedOccupancyZone.length - sortedIndex} trains`;

        drawRemainingTrainsBox({ ctx, text, textX, textY });

        break;
      }
    }
  });
};
