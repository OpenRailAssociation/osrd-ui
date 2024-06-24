import { clearCanvas, maxPositionValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';

const { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP, MARGIN_BOTTOM, CURVE_MARGIN_SIDES } = MARGINS;

export const drawGridX = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { stops, ratioX, leftOffset } = store;

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([2, 4]);

  const { maxPosition } = maxPositionValues(store);

  // vertical lines based on ratio and round max position

  ctx.beginPath();
  stops.forEach((stop) => {
    const x =
      stop.position *
        ((width - CURVE_MARGIN_SIDES - MARGIN_LEFT - MARGIN_RIGHT) / maxPosition) *
        ratioX +
      CURVE_MARGIN_SIDES / 2;
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
