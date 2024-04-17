import { clearCanvas, speedRangeValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';

const { MARGIN_LEFT, MARGIN_TOP, MARGIN_BOTTOM, CURVE_MARGIN_TOP } = MARGINS;

export const drawTickY = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { speed } = store;

  clearCanvas(ctx, width, height);

  const { maxSpeed } = speedRangeValues(store);

  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 0.5;
  ctx.font = 'normal 12px IBM Plex Sans';
  ctx.fillStyle = 'rgb(182, 179, 175)';
  const textOffsetX = 36;
  const textOffsetY = 24;

  // horizontal ticks based on 10 units of round max speed

  const yPosition = (height - MARGIN_BOTTOM - MARGIN_TOP - CURVE_MARGIN_TOP) / maxSpeed;

  ctx.beginPath();
  speed.forEach((_, i) => {
    if (i >= 0 && i * 10 <= maxSpeed + 10) {
      ctx.moveTo(43, height - MARGIN_BOTTOM - yPosition * i * 10);
      ctx.lineTo(MARGIN_LEFT, height - MARGIN_BOTTOM - yPosition * i * 10);
      ctx.textAlign = 'right';
      const text = (i * 10).toString();
      const textPositionY = height - MARGIN_TOP + 2 - textOffsetY - yPosition * i * 10;
      let opacity = 1;

      // low progressivily opacity for text when text is near borders, except for 0
      if (textPositionY < MARGIN_TOP + 30)
        opacity = (10 - (MARGIN_TOP + 30 - textPositionY) / 3) / 10;
      if (textPositionY > height - MARGIN_BOTTOM - 30)
        opacity = (10 - (height - MARGIN_BOTTOM - 30 - textPositionY) / 3) / 10;

      ctx.fillStyle = `rgba(182, 179, 175, ${opacity})`;
      ctx.fillText(text, textOffsetX, textPositionY);
    }
  });
  ctx.closePath();
  ctx.stroke();

  // prevent overlapping with margin top
  ctx.clearRect(0, 0, width, MARGIN_TOP);
  ctx.clearRect(MARGIN_LEFT - 6, height - MARGIN_BOTTOM, width, MARGIN_BOTTOM);
  ctx.clearRect(0, height - MARGIN_BOTTOM + 6, MARGIN_LEFT, MARGIN_BOTTOM);
};
