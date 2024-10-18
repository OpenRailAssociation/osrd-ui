import type { DrawFunctionParams } from '../../../types/chartTypes';
import { GREY_50, GREY_80, LIGHT_BLUE, MARGINS } from '../../const';
import {
  clearCanvas,
  positionToPosX,
  maxPositionValue,
  filterStops,
  getSnappedStop,
} from '../../utils';

const { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP, MARGIN_BOTTOM } = MARGINS;
const STEP_HEIGHT = 6;
const STEP_WIDTH = 1;
const STEP_RADIUS = 1.0;

export const drawSteps = ({ ctx, width, height, store }: DrawFunctionParams) => {
  const { stops, ratioX, leftOffset, cursor } = store;

  if (stops.length === 0) {
    return;
  }

  clearCanvas(ctx, width, height);

  const maxPosition = maxPositionValue(store.speeds);

  const filteredStops = filterStops(stops, ratioX, width, maxPosition);

  ctx.save();
  ctx.translate(leftOffset, 0);

  ctx.strokeStyle = LIGHT_BLUE.alpha(0.5).hex();
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.setLineDash([1, 6]);

  // Vertical lines
  ctx.beginPath();
  filteredStops.forEach(({ position }) => {
    const posX = positionToPosX(position.start, maxPosition, width, ratioX);
    ctx.moveTo(posX, MARGIN_TOP);
    ctx.lineTo(posX, height - MARGIN_BOTTOM);
  });
  ctx.stroke();

  // Step rectangles
  ctx.lineWidth = 2;
  ctx.fillStyle = GREY_50.hex();
  ctx.strokeStyle = GREY_50.hex();
  ctx.setLineDash([]);

  const snappedStop = cursor.x ? getSnappedStop(cursor.x, width, store) : null;

  filteredStops.forEach(({ position }) => {
    if (snappedStop && position.start === snappedStop.position.start) {
      return;
    }
    const posX = positionToPosX(position.start, maxPosition, width, ratioX);

    ctx.beginPath();
    ctx.roundRect(
      posX - STEP_WIDTH / 2,
      height - STEP_HEIGHT - MARGIN_BOTTOM - 1,
      STEP_WIDTH,
      STEP_HEIGHT,
      [STEP_RADIUS, STEP_RADIUS, 0, 0]
    );
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  });
  ctx.restore();

  // Text
  const filteredTextStops = filterStops(filteredStops, ratioX, width, maxPosition, 25);
  filteredTextStops.forEach(({ position, value }) => {
    if (snappedStop && position.start === snappedStop.position.start) {
      return;
    }

    ctx.save();
    // Calculate the original x and y positions before rotation
    const posX = positionToPosX(position.start, maxPosition, width, ratioX, leftOffset);
    const posY = height - STEP_HEIGHT - MARGIN_BOTTOM - 8;

    // Apply the translation and rotation
    ctx.translate(posX, posY);
    ctx.rotate((-40 * Math.PI) / 180); // -40 degrees in radians

    ctx.fillStyle = GREY_80.alpha(0.2).hex();
    ctx.font = 'normal 12px IBM Plex Sans';
    ctx.textAlign = 'left';

    // Draw the text at the origin, since the context is already transformed
    ctx.fillText(value!, 0, 0);
    ctx.restore();
  });

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, MARGIN_LEFT, height);
  ctx.clearRect(width - MARGIN_RIGHT, 0, MARGIN_RIGHT, height);
  ctx.clearRect(0, 0, width, MARGIN_TOP);
  ctx.clearRect(0, height - MARGIN_BOTTOM, width, MARGIN_BOTTOM);
};
