import type { Store } from '../types/chartTypes';
import { LAYERS_HEIGHTS, MARGINS } from './const';

type SpeedRangeValues = {
  minSpeed: number;
  maxSpeed: number;
  speedRange: number;
};

type MaxPositionValues = {
  maxPosition: number;
  RoundMaxPosition: number;
  intermediateTicksPosition: number;
};

export const getGraphOffsets = (width: number, height: number) => {
  const WIDTH_OFFSET = width - 68;
  const HEIGHT_OFFSET = height - 80;
  return { WIDTH_OFFSET, HEIGHT_OFFSET };
};

/**
 * /**
 * Given a store including a list of speed data, return the minSpeed, maxSpeed and speedRange
 * @param store
 */
export const speedRangeValues = (store: Store): SpeedRangeValues => {
  const speed = store.speed;
  const minSpeed = Math.min(...speed.map((data) => data.speed));
  const maxSpeed = Math.max(...speed.map((data) => data.speed));
  const speedRange = maxSpeed - minSpeed;
  return { minSpeed, maxSpeed, speedRange };
};

/**
 * Given a store including a list of speed data and a ratio value, return the max position, the rounded max position and the intermediate ticks position
 * @param store
 */
export const maxPositionValues = (store: Store): MaxPositionValues => {
  if (store.speed.length === 0) {
    return { maxPosition: 0, RoundMaxPosition: 0, intermediateTicksPosition: 0 };
  }
  const maxPosition = store.speed[store.speed.length - 1].position;
  const RoundMaxPosition = Math.floor(maxPosition / (Math.ceil(store.ratioX) * 20));
  const intermediateTicksPosition = Math.floor(maxPosition / (Math.ceil(store.ratioX) * 40));

  return { maxPosition, RoundMaxPosition, intermediateTicksPosition };
};

export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
};

/**
 * Calculates the adaptive height based on the height supplied and the lineaires displayed.
 * @param height - The initial height value.
 * @param layersDisplay - The linear display options.
 * @param isIncludingLinearLayers - A flag to add or remove layers. Default is true.
 * @returns The calculated adaptive height.
 */
export const getAdaptiveHeight = (
  height: number,
  layersDisplay: Store['layersDisplay'],
  isIncludingLinearLayers: boolean = true
): number => {
  const { ELECTRICAL_PROFILES_HEIGHT, POWER_RESTRICTIONS_HEIGHT, SPEED_LIMIT_TAGS_HEIGHT } =
    LAYERS_HEIGHTS;

  const layerHeights = {
    electricalProfiles: ELECTRICAL_PROFILES_HEIGHT,
    powerRestrictions: POWER_RESTRICTIONS_HEIGHT,
    speedLimitTags: SPEED_LIMIT_TAGS_HEIGHT,
  };

  let adjustment = 0;

  Object.keys(layerHeights).forEach((key) => {
    const layer = key as keyof typeof layerHeights;
    if (layersDisplay[layer]) {
      adjustment += isIncludingLinearLayers ? layerHeights[layer] : -layerHeights[layer];
    }
  });
  return height + adjustment;
};

/**
 * Calculates the position on the graph scale based on the given parameters.
 * @param position - The current position.
 * @param maxPosition - The maximum position.
 * @param width - The width of the graph.
 * @param ratioX - The X-axis ratio.
 * @param margins - The margins of the graph.
 * @returns The calculated position on the graph scale.
 */
export const positionOnGraphScale = (
  position: number,
  maxPosition: number,
  width: number,
  ratioX: number,
  margins: typeof MARGINS
) => {
  return (
    position *
      ((width - margins.CURVE_MARGIN_SIDES - margins.MARGIN_LEFT - margins.MARGIN_RIGHT) /
        maxPosition) *
      ratioX +
    margins.MARGIN_LEFT +
    margins.CURVE_MARGIN_SIDES / 2
  );
};

/**
 * Draws a separator line on a canvas context.
 *
 * @param ctx - The canvas rendering context.
 * @param separatorColor - The color of the separator line.
 * @param margins - The margins of the canvas.
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 */
export const drawSeparatorLinearLayer = (
  ctx: CanvasRenderingContext2D,
  separatorColor: string,
  margins: typeof MARGINS,
  width: number,
  height: number
) => {
  const { MARGIN_LEFT, MARGIN_BOTTOM, MARGIN_RIGHT } = margins;
  ctx.beginPath();
  ctx.strokeStyle = separatorColor;
  ctx.lineWidth = 1;
  ctx.moveTo(MARGIN_LEFT, height - MARGIN_BOTTOM);
  ctx.lineTo(width - MARGIN_RIGHT, height - MARGIN_BOTTOM);
  ctx.stroke();
};

/**
 * Draw the background for linear layers. Depending on the layer and how many are displayed, the background color
 * will change.
 * @param backgroundColor depends on the linear layer. Electrical profile is always first, power restrictions
 * can be first or second, speedlimit tags can be on any position.
 */
export const drawLinearLayerBackground = (
  ctx: CanvasRenderingContext2D,
  backgroundColor: string,
  margins: typeof MARGINS,
  width: number,
  height: number,
  linearLayerHeight: number
) => {
  const { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_BOTTOM } = margins;

  ctx.beginPath();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(
    MARGIN_LEFT,
    height - MARGIN_BOTTOM + 1, //  +1 is separator linear layer height
    width - MARGIN_LEFT - MARGIN_RIGHT,
    linearLayerHeight
  );
};
