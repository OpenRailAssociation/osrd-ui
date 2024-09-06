import type { DrawFunctionParams } from '../../../types/chartTypes';
import { clearCanvas, getStopPosition, maxPositionValue } from '../../utils';

const STEP_HEIGHT = 6;
const STEP_WIDTH = 1;
const STEP_RADIUS = 0.3;

export const drawStep = ({ ctx, width, height, store }: DrawFunctionParams) => {
  const { stops, ratioX, leftOffset } = store;

  if (stops.length === 0) {
    return;
  }

  const maxPosition = maxPositionValue(store);

  let stopPosition = getStopPosition(stops[0].position, width, ratioX, maxPosition);

  const filteredStops = stops.filter(({ position }) => {
    const actualX = getStopPosition(position, width, ratioX, maxPosition);
    if (actualX - stopPosition < 16 && actualX !== stopPosition) {
      return false;
    }
    stopPosition = actualX;
    return true;
  });

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  ctx.fillStyle = 'rgb(121, 118, 113)';
  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 2;

  filteredStops.forEach(({ position }) => {
    const x = getStopPosition(position, width, ratioX, maxPosition);

    ctx.beginPath();
    ctx.roundRect(x - 0.5, height - STEP_HEIGHT, STEP_WIDTH, STEP_HEIGHT, [
      STEP_RADIUS,
      STEP_RADIUS,
      0,
      0,
    ]);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  });

  ctx.restore();

  filteredStops.forEach(({ position, value }) => {
    ctx.save();
    // Calculate the original x and y positions before rotation
    const x = getStopPosition(position, width, ratioX, maxPosition);

    const y = height - 12;

    // Apply the translation and rotation
    ctx.translate(x + leftOffset, y);
    ctx.rotate(-Math.PI / 4); // -45 degrees in radians

    ctx.fillStyle = 'rgba(49, 46, 43, 0.3)';
    ctx.font = 'normal 12px IBM Plex Sans';
    ctx.textAlign = 'left';

    // Draw the text at the origin, since the context is already transformed
    ctx.fillText(value!, 0, 0);

    ctx.restore();
  });
};
