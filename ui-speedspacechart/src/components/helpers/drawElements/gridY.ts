import { clearCanvas, speedRangeValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';

const { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP, MARGIN_BOTTOM, CURVE_MARGIN_TOP } = MARGINS;

export const drawGridY = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { speed } = store;

  clearCanvas(ctx, width, height);

  const { maxSpeed } = speedRangeValues(store);

  ctx.strokeStyle = 'rgba(33, 112, 185, 0.25)';
  ctx.lineWidth = 0.5;

  // horizontal lines based on 10 units of round max speed

  const yPosition = (height - MARGIN_BOTTOM - MARGIN_TOP - CURVE_MARGIN_TOP) / maxSpeed;

  ctx.beginPath();
  speed.forEach((_, i) => {
    if (i >= 0 && i * 10 <= maxSpeed + 10) {
      ctx.moveTo(MARGIN_LEFT, height - MARGIN_BOTTOM - yPosition * i * 10);
      ctx.lineTo(width - MARGIN_RIGHT, height - MARGIN_BOTTOM - yPosition * i * 10);
    }
  });
  ctx.closePath();
  ctx.stroke();

  // prevent overlapping with margin top
  ctx.clearRect(0, 0, width, MARGIN_TOP);
  ctx.clearRect(0, height - MARGIN_BOTTOM, width, MARGIN_BOTTOM);
};

export const drawMajorGridY = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { speed } = store;

  clearCanvas(ctx, width, height);

  const { maxSpeed } = speedRangeValues(store);

  ctx.strokeStyle = 'rgba(33, 112, 185, 0.6)';
  ctx.lineWidth = 0.5;

  // horizontal lines based on 30 units of round max speed

  const yPosition = (height - MARGIN_BOTTOM - MARGIN_TOP - CURVE_MARGIN_TOP) / maxSpeed;

  ctx.beginPath();
  speed.forEach((_, i) => {
    if (i >= 1 && i * 10 <= (maxSpeed + 10) / 3) {
      ctx.moveTo(MARGIN_LEFT, height - MARGIN_BOTTOM - yPosition * i * 30);
      ctx.lineTo(width - MARGIN_RIGHT, height - MARGIN_BOTTOM - yPosition * i * 30);
    }
  });
  ctx.closePath();
  ctx.stroke();

  // prevent overlapping with margin top
  ctx.clearRect(0, 0, width, MARGIN_TOP);
  ctx.clearRect(0, height - MARGIN_BOTTOM, width, MARGIN_BOTTOM);

  ctx.fillStyle = 'rgb(182, 179, 175)';
  ctx.textAlign = 'center';
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;

  // text for y axis
  ctx.beginPath();
  ctx.fillText('km/h', 22, 30);
  ctx.closePath();
  ctx.stroke();
};
