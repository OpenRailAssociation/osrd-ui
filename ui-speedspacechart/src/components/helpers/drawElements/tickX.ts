import { clearCanvas, maxPositionValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';

const { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_BOTTOM, CURVE_MARGIN_SIDES } = MARGINS;

export const drawTickX = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { speed, ratioX, leftOffset, cursor } = store;

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 0.5;
  ctx.font = 'normal 12px IBM Plex Sans';
  ctx.fillStyle = 'rgb(182, 179, 175)';

  const { maxPosition, RoundMaxPosition, intermediateTicksPosition } = maxPositionValues(store);

  // vertical ticks based on ratio and round max position

  const xPosition =
    ((width - CURVE_MARGIN_SIDES - MARGIN_LEFT - MARGIN_RIGHT) / maxPosition) *
    RoundMaxPosition *
    ratioX;

  const intermediateXPosition =
    ((width - CURVE_MARGIN_SIDES - MARGIN_LEFT - MARGIN_RIGHT) / maxPosition) *
    intermediateTicksPosition *
    ratioX;

  ctx.beginPath();

  speed.forEach((_, i) => {
    if (i <= Math.ceil(ratioX) * 40 && i % 2 !== 0) {
      ctx.moveTo(
        MARGIN_LEFT + intermediateXPosition * i + CURVE_MARGIN_SIDES / 2,
        height - MARGIN_BOTTOM
      );
      ctx.lineTo(
        MARGIN_LEFT + intermediateXPosition * i + CURVE_MARGIN_SIDES / 2,
        height - MARGIN_BOTTOM + 4
      );
    }
  });

  speed.forEach((_, i) => {
    if (i <= Math.ceil(ratioX) * 20) {
      ctx.moveTo(MARGIN_LEFT + xPosition * i + CURVE_MARGIN_SIDES / 2, height - MARGIN_BOTTOM);
      ctx.lineTo(
        MARGIN_LEFT + xPosition * i + CURVE_MARGIN_SIDES / 2,
        height - MARGIN_BOTTOM + CURVE_MARGIN_SIDES / 2
      );

      if (i % 2 === 0) {
        ctx.textAlign = 'center';
        const text =
          (i * RoundMaxPosition) / 1000
            ? ((i * RoundMaxPosition) / 1000).toFixed(1).toString()
            : '0';
        const textPositionX = MARGIN_LEFT + xPosition * i + CURVE_MARGIN_SIDES / 2;
        let opacity = 1;

        // low progressivily opacity for text when text is near borders or cursor, except for 0
        if (
          cursor.x &&
          cursor.x + MARGIN_LEFT - leftOffset < textPositionX + 40 &&
          cursor.x + MARGIN_LEFT - leftOffset > textPositionX - 40
        )
          opacity =
            (10 - (40 - Math.abs(cursor.x + MARGIN_LEFT - leftOffset - textPositionX)) / 4) / 10;
        if (text !== '0' && textPositionX < MARGIN_LEFT - leftOffset + 30)
          opacity = (10 - (MARGIN_LEFT - leftOffset + 30 - textPositionX) / 3) / 10;
        if (text !== '0' && textPositionX > width - MARGIN_RIGHT - leftOffset - 30)
          opacity = (10 - (textPositionX - (width - MARGIN_RIGHT - leftOffset - 30)) / 3) / 10;

        ctx.fillStyle = `rgb(182, 179, 175, ${opacity})`;
        ctx.fillText(text, textPositionX, height - MARGIN_BOTTOM + 24);
      }
    }
  });

  ctx.closePath();
  ctx.stroke();

  ctx.restore();

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, MARGIN_LEFT, height);
  ctx.clearRect(width - MARGIN_RIGHT, 0, width, height);

  // text for x axis
  ctx.fillStyle = 'rgb(182, 179, 175)';
  ctx.textAlign = 'center';
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.fillText('km', width - MARGIN_RIGHT + CURVE_MARGIN_SIDES / 2, height - MARGIN_BOTTOM + 24);
  ctx.closePath();
  ctx.stroke();
};
