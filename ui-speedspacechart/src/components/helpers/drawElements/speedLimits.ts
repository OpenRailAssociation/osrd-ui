import type { DrawFunctionParams } from '../../../types/chartTypes';
import { ERROR_60, MARGINS } from '../../const';
import { clearCanvas, positionToPosX, maxPositionValue, maxSpeedValue } from '../../utils';

const { CURVE_MARGIN_TOP } = MARGINS;

export const drawSpeedLimits = ({ ctx, width, height, store }: DrawFunctionParams) => {
  const { mrsp, trainLength, ratioX, leftOffset } = store;
  const maxSpeed = maxSpeedValue(store);

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const maxPosition = maxPositionValue(store);

  // TODO: draw speed limits
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.strokeStyle = ERROR_60.hex();

  const adjustedHeight = height - CURVE_MARGIN_TOP;
  const y = height - (200 / maxSpeed) * adjustedHeight;
  const xStart = positionToPosX(0, maxPosition, width, ratioX);
  ctx.lineTo(xStart, y);
  const xEnd = positionToPosX(maxPosition, maxPosition, width, ratioX);
  ctx.lineTo(xEnd, y);
  ctx.stroke();

  ctx.restore();
};
