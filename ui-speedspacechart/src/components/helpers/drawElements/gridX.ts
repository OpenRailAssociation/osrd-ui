import type { DrawFunctionParams } from '../../../types/chartTypes';
import { MARGINS } from '../../const';
import { clearCanvas, getStopPosition, maxPositionValues } from '../../utils';

const { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP, MARGIN_BOTTOM } = MARGINS;

export const drawGridX = ({ ctx, width, height, store }: DrawFunctionParams) => {
  const { stops, ratioX, leftOffset } = store;

  if (stops.length === 0) {
    return;
  }

  const { maxPosition } = maxPositionValues(store);

  let stopPosition = getStopPosition(
    stops[0].position,
    width - MARGIN_LEFT - MARGIN_RIGHT,
    ratioX,
    maxPosition
  );

  const filteredStops = stops.filter(({ position }) => {
    const actualX = getStopPosition(
      position,
      width - MARGIN_LEFT - MARGIN_RIGHT,
      ratioX,
      maxPosition
    );
    if (actualX - stopPosition < 16 && actualX !== stopPosition) {
      return false;
    }
    stopPosition = actualX;
    return true;
  });

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([2, 4]);

  // vertical lines based on ratio and round max position

  ctx.beginPath();
  filteredStops.forEach(({ position }) => {
    const x = getStopPosition(position, width - MARGIN_LEFT - MARGIN_RIGHT, ratioX, maxPosition);

    ctx.moveTo(x + MARGIN_LEFT, height - (height - MARGIN_TOP));
    ctx.lineTo(x + MARGIN_LEFT, height - MARGIN_BOTTOM);
  });

  ctx.closePath();
  ctx.stroke();

  ctx.restore();

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, MARGIN_LEFT, height);
  ctx.clearRect(width - MARGIN_RIGHT, 0, MARGIN_RIGHT, height);
  ctx.clearRect(0, 0, width, MARGIN_TOP);
  ctx.clearRect(0, height - MARGIN_BOTTOM, width, MARGIN_BOTTOM);

  ctx.fillStyle = 'rgb(182, 179, 175)';
  ctx.textAlign = 'center';
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
};
