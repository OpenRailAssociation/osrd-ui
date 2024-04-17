import { clearCanvas, maxPositionValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';

const { CURVE_MARGIN_SIDES } = MARGINS;

export const drawStep = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { stops, ratioX, leftOffset } = store;

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const { maxPosition } = maxPositionValues(store);

  ctx.fillStyle = 'rgb(121, 118, 113)';
  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 2;

  stops.forEach((stop) => {
    const x =
      stop.position * ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX +
      CURVE_MARGIN_SIDES / 2;
    ctx.beginPath();
    ctx.roundRect(x - 0.5, height - 6, 1, 6, [0.3, 0.3, 0, 0]);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  });

  ctx.restore();
};

export const drawStepText = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { stops, ratioX, leftOffset } = store;

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  ctx.fillStyle = 'rgb(49, 46, 43)';
  ctx.font = 'normal 12px IBM Plex Sans';
  ctx.textAlign = 'left';

  stops.forEach((stop) => {
    // ctx.rotate(-Math.PI / 4);
    // ctx.save();
    const x =
      stop.position *
        ((width - CURVE_MARGIN_SIDES) / maxPositionValues(store).maxPosition) *
        ratioX +
      CURVE_MARGIN_SIDES / 2;
    const y = height - 12;
    ctx.fillText(stop.name!, x, y);
    // ctx.restore();
  });

  ctx.restore();
};
