import type { LayerData, Store } from '../types/chartTypes';
import {
  MARGINS,
  LINEAR_LAYER_SEPARATOR_HEIGHT,
  LINEAR_LAYERS_HEIGHTS_BY_NAME,
  LAYERS_SELECTION,
} from './const';

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

type SlopesValues = {
  minGradient: number;
  maxGradient: number;
  slopesRange: number;
  maxPosition: number;
};

export const getGraphOffsets = (width: number, height: number, declivities?: boolean) => {
  const WIDTH_OFFSET = declivities ? width - 102 : width - 60; // +2px so that the tick appears on the right of the chart
  const HEIGHT_OFFSET = height - 80;
  return { WIDTH_OFFSET, HEIGHT_OFFSET };
};

/**
 * /**
 * Given a store including a list of speed data, return the minSpeed, maxSpeed and speedRange
 * @param store
 */
export const speedRangeValues = (store: Store): SpeedRangeValues => {
  const speeds = store.speeds;
  const minSpeed = Math.min(...speeds.map(({ value }) => value));
  const maxSpeed = Math.max(...speeds.map(({ value }) => value));
  const speedRange = maxSpeed - minSpeed;
  return { minSpeed, maxSpeed, speedRange };
};

/**
 * Given a store including a list of speed data and a ratio value, return the max position, the rounded max position and the intermediate ticks position
 * @param store
 */
export const maxPositionValues = (store: Store): MaxPositionValues => {
  if (store.speeds.length === 0) {
    return { maxPosition: 0, RoundMaxPosition: 0, intermediateTicksPosition: 0 };
  }
  const maxPosition = store.speeds[store.speeds.length - 1].position.start;
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
  let adjustment = 0;

  Object.keys(LINEAR_LAYERS_HEIGHTS_BY_NAME).forEach((key) => {
    const layer = key as keyof typeof LINEAR_LAYERS_HEIGHTS_BY_NAME;
    if (layersDisplay[layer]) {
      adjustment += isIncludingLinearLayers
        ? LINEAR_LAYERS_HEIGHTS_BY_NAME[layer]
        : -LINEAR_LAYERS_HEIGHTS_BY_NAME[layer];
    }
  });
  return height + adjustment;
};

/**
 * Calculates the top position for the linear layers based on the height and the layers displayed.
 * The speed limit tags linear layer needs to call this function with the isSpeedLimitByTag flag set to true.
 */
export const getLinearLayerMarginTop = (
  height: number,
  layersDisplay: Store['layersDisplay'],
  isSpeedLimitByTag: boolean = false
) => {
  let adjustment = 0;
  const { electricalProfiles, powerRestrictions } = layersDisplay;

  if (electricalProfiles) adjustment = LINEAR_LAYERS_HEIGHTS_BY_NAME.electricalProfiles;

  if (powerRestrictions && isSpeedLimitByTag)
    adjustment += LINEAR_LAYERS_HEIGHTS_BY_NAME.powerRestrictions;

  return height + adjustment - MARGINS.MARGIN_BOTTOM;
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
  const { MARGIN_LEFT, MARGIN_RIGHT } = margins;
  ctx.beginPath();
  ctx.strokeStyle = separatorColor;
  ctx.lineWidth = 1;
  ctx.moveTo(MARGIN_LEFT, height);
  ctx.lineTo(width - MARGIN_RIGHT, height);
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
  startingHeight: number,
  layerHeight: number
) => {
  const { MARGIN_LEFT, MARGIN_RIGHT } = margins;

  ctx.beginPath();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(
    MARGIN_LEFT,
    startingHeight - layerHeight + LINEAR_LAYER_SEPARATOR_HEIGHT,
    width - MARGIN_LEFT - MARGIN_RIGHT,
    layerHeight
  );
};

/**
 * Check if an optional layer data is missing in the store.
 * Optional datas : electricalProfiles, powerRestrictions, speedLimitTags
 */
export const checkLayerData = (store: Store, selection: (typeof LAYERS_SELECTION)[number]) => {
  return (
    (selection === 'electricalProfiles' ||
      selection === 'powerRestrictions' ||
      selection === 'speedLimitTags') &&
    !store[selection]
  );
};
/**
 * Given a store including a list of slopes, return the position and value of min and max slopes
 * @param store
 */
export const slopesValues = (store: Store): SlopesValues => {
  const slopes = store.slopes;
  const minGradient = Math.min(...slopes.map(({ value }) => value));
  const maxGradient = Math.max(...slopes.map(({ value }) => value));
  const slopesRange = maxGradient - minGradient;
  const maxPosition = Math.max(...slopes.map(({ position }) => position.start));
  return { minGradient, maxGradient, slopesRange, maxPosition };
};

// Draws an image on a canvas context with a specified color.
export const drawSvgImageWithColor = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) return;

  tempCanvas.width = width;
  tempCanvas.height = height;

  // Draw the image on the temporary canvas
  tempCtx.drawImage(image, 0, 0, width, height);

  // Set the composite mode to "source-in" to color the image
  tempCtx.globalCompositeOperation = 'source-in';
  tempCtx.fillStyle = color;
  tempCtx.fillRect(0, 0, width, height);

  // Draw the colored image back to the main canvas
  ctx.drawImage(tempCanvas, x, y);
};

export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

export const loadSvgImage = (svgUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = svgUrl;
  });
};

export const createSvgBlobUrl = (svgString: string): string => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

export const findPreviousAndNextPosition = <T = string | number>(
  data: LayerData<T>[],
  cursorX: number,
  xPositionReference: (ref: number) => number
) => {
  const previousPosition = data.findLast(
    ({ position }) => xPositionReference(position.start) <= cursorX!
  );
  const nextPosition = data.find(({ position }) => xPositionReference(position.start) >= cursorX!);

  return { previousPosition, nextPosition };
};
