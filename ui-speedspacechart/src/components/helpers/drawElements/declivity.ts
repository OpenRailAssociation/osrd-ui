import { clearCanvas, slopesValues, maxPositionValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';
import { SLOPE_FILL_COLOR } from '../../../components/const';

const { CURVE_MARGIN_SIDES, MARGIN_TOP, MARGIN_BOTTOM, RIGHT_TICK_MARGINS } = MARGINS;

export const drawDeclivity = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { slopes, ratioX, leftOffset } = store;

  const { maxGradient } = slopesValues(store);
  const { maxPosition } = maxPositionValues(store);

  if (!slopes || slopes.length === 0) {
    console.error('Slopes data is missing or empty.');
    return;
  }

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  // Calculate total height available for drawing, excluding the margins
  const availableHeight = height - MARGIN_TOP - MARGIN_BOTTOM - RIGHT_TICK_MARGINS / 2;

  // Calculate the vertical center of the chart
  const centerY = MARGIN_TOP + RIGHT_TICK_MARGINS / 2 + availableHeight / 2;

  ctx.fillStyle = SLOPE_FILL_COLOR;

  try {
    const coef = ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX;

    for (let i = 0; i < slopes.length - 1; i++) {
      const current = slopes[i];
      const next = slopes[i + 1];

      const x1 = current.position * coef + CURVE_MARGIN_SIDES / 2;
      const x2 = next.position * coef + CURVE_MARGIN_SIDES / 2;

      const rectWidth = x2 - x1;

      const rectHeight = (current.gradient / maxGradient) * (availableHeight / 2);

      const rectY = current.gradient >= 0 ? centerY - rectHeight : centerY;

      ctx.fillRect(x1, rectY, rectWidth, Math.abs(rectHeight));
    }
  } catch (error) {
    console.error('Error while drawing declivity:', error);
  }
  ctx.restore();
};
