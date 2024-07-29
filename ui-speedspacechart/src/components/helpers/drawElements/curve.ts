import type {
  CanvasConfig,
  CurveConfig,
  DrawFunctionParams,
  LayerData,
} from '../../../types/chartTypes';
import { MARGINS } from '../../const';
import { clearCanvas, maxPositionValues, speedRangeValues } from '../../utils';

const { CURVE_MARGIN_TOP, CURVE_MARGIN_SIDES } = MARGINS;

const drawSpecificCurve = (
  curveConfig: CurveConfig,
  canvasConfig: CanvasConfig,
  specificSpeeds: LayerData<number>[]
) => {
  const { minSpeed, speedRange, maxPosition, ratioX } = curveConfig;
  const { width, height, ctx } = canvasConfig;

  const adjustedWidth = width - CURVE_MARGIN_SIDES;
  const halfCurveMarginSides = CURVE_MARGIN_SIDES / 2;
  const adjustedHeight = height - CURVE_MARGIN_TOP;
  const xcoef = (adjustedWidth / maxPosition) * ratioX;

  return specificSpeeds.forEach(({ position, value }) => {
    // normalize speed based on range of values
    const normalizedSpeed = (value - minSpeed) / speedRange;
    const x = position.start * xcoef + halfCurveMarginSides;
    const y = height - normalizedSpeed * adjustedHeight;
    ctx.lineTo(x, y);
  });
};

export const drawCurve = ({ ctx, width, height, store }: DrawFunctionParams) => {
  const { speeds, ecoSpeeds, ratioX, leftOffset } = store;

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const { minSpeed, speedRange } = speedRangeValues(store);
  const { maxPosition } = maxPositionValues(store);

  ctx.lineWidth = 0.5;
  ctx.fillStyle = 'rgba(17, 101, 180, 0.02)';
  ctx.strokeStyle = 'rgb(17, 101, 180, 0.5)';

  ctx.beginPath();
  drawSpecificCurve({ minSpeed, speedRange, maxPosition, ratioX }, { width, height, ctx }, speeds);
  ctx.closePath();
  ctx.fill();

  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255)';
  ctx.strokeStyle = 'rgb(17, 101, 180)';
  ctx.globalCompositeOperation = 'destination-out';

  ctx.beginPath();
  drawSpecificCurve(
    { minSpeed, speedRange, maxPosition, ratioX },
    { width, height, ctx },
    ecoSpeeds
  );
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  ctx.stroke();

  ctx.restore();
};
