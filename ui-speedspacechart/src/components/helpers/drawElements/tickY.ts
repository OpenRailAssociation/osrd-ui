import type { DrawFunctionParams } from '../../../types/chartTypes';
import { MARGINS } from '../../const';
import { clearCanvas, speedRangeValues } from '../../utils';

const { MARGIN_LEFT, MARGIN_TOP, MARGIN_BOTTOM, CURVE_MARGIN_TOP } = MARGINS;

export const drawTickY = ({ ctx, width, height, store }: DrawFunctionParams) => {
  const { maxSpeed } = speedRangeValues(store);

  clearCanvas(ctx, width, height);

  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 0.5;
  ctx.font = 'normal 12px IBM Plex Sans';
  ctx.fillStyle = 'rgb(182, 179, 175)';
  const textOffsetX = 36;

  let tickScale = 5;
  if (maxSpeed > 250) {
    tickScale = 30;
  } else if (maxSpeed > 150) {
    tickScale = 20;
  } else if (maxSpeed > 60) {
    tickScale = 10;
  }
  const nbTicks = Math.ceil(maxSpeed / tickScale);
  const maxTickSpeed = nbTicks * tickScale;
  const ratioRoundPositions = maxTickSpeed / maxSpeed;
  const ticksOffset =
    ((height - MARGIN_BOTTOM - MARGIN_TOP - CURVE_MARGIN_TOP) * ratioRoundPositions) / nbTicks;

  ctx.beginPath();
  for (let i = 0; i <= nbTicks; i++) {
    const positionY = height - MARGIN_BOTTOM - ticksOffset * i;
    ctx.moveTo(42, positionY);
    ctx.lineTo(MARGIN_LEFT, positionY);
    ctx.textAlign = 'right';
    const text = (i * tickScale).toString();
    const textPositionY = positionY + 4;

    ctx.fillStyle = `rgb(182, 179, 175 )`;
    ctx.fillText(text, textOffsetX, textPositionY);
  }
  ctx.closePath();
  ctx.stroke();

  // prevent overlapping with margin top
  ctx.clearRect(0, 0, width, MARGIN_TOP);
  ctx.clearRect(MARGIN_LEFT - 6, height - MARGIN_BOTTOM, width, MARGIN_BOTTOM);
  ctx.clearRect(0, height - MARGIN_BOTTOM + 6, MARGIN_LEFT, MARGIN_BOTTOM);
};
