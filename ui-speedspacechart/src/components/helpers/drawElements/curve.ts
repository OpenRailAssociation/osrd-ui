import { clearCanvas, maxPositionValues, speedRangeValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';

const { CURVE_MARGIN_TOP, CURVE_MARGIN_SIDES } = MARGINS;

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { speed, ratioX, leftOffset } = store;

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const { minSpeed, speedRange } = speedRangeValues(store);
  const { maxPosition } = maxPositionValues(store);

  ctx.fillStyle = 'rgba(17, 101, 180, 0.02)';
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.lineWidth = 0.5;

  ctx.beginPath();
  speed.forEach((data) => {
    // normalize speed based on range of values
    const normalizedSpeed = (data.speed - minSpeed) / speedRange;
    const x =
      data.position * ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX +
      CURVE_MARGIN_SIDES / 2;
    const y = height - normalizedSpeed * (height - CURVE_MARGIN_TOP);
    ctx.lineTo(x, y);
  });

  // add fill() before stroke() to avoid overlapping while filling the area
  ctx.fill();

  ctx.stroke();

  ctx.restore();
};
