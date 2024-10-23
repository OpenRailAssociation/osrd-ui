import {
  CURSOR_SNAP_DISTANCE,
  LINEAR_LAYER_SEPARATOR_HEIGHT,
  LINEAR_LAYERS_HEIGHTS,
  LINEAR_LAYERS_HEIGHTS_BY_NAME,
  MARGINS,
  type LAYERS_SELECTION,
} from './const';
import type { LayerData, Store } from '../types/chartTypes';

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
 * Given a list of speed data, return the maxSpeed
 * @param speeds
 */
export const maxSpeedValue = (speeds: LayerData<number>[]) =>
  Math.max(...speeds.map(({ value }) => value));
/**
 * Given a list of speed data return the max position
 * @param speeds
 */
export const maxPositionValue = (speeds: LayerData<number>[]): number => {
  if (speeds.length === 0) {
    return 0.0;
  }
  return speeds[speeds.length - 1].position.start;
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
  const adjustment = [
    layersDisplay.electricalProfiles ? LINEAR_LAYERS_HEIGHTS.ELECTRICAL_PROFILES_HEIGHT : 0,
    layersDisplay.powerRestrictions ? LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS_HEIGHT : 0,
    layersDisplay.speedLimitTags ? LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT : 0,
  ].reduce((acc, curr) => acc + curr, 0);

  return (height += isIncludingLinearLayers ? adjustment : -adjustment);
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

export const getLinearLayersDisplayedHeight = (layersDisplay: Store['layersDisplay']) =>
  [
    layersDisplay.electricalProfiles ? LINEAR_LAYERS_HEIGHTS.ELECTRICAL_PROFILES_HEIGHT : 0,
    layersDisplay.powerRestrictions ? LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS_HEIGHT : 0,
    layersDisplay.speedLimitTags ? LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT : 0,
  ].reduce((acc, curr) => acc + curr, 0);

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
) =>
  position *
    ((width - margins.CURVE_MARGIN_SIDES - margins.MARGIN_LEFT - margins.MARGIN_RIGHT) /
      maxPosition) *
    ratioX +
  margins.MARGIN_LEFT +
  margins.CURVE_MARGIN_SIDES / 2;

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
 * Return wether a layer should be active or not.
 * Depending on the available data, some layers should be disabled.
 */
export const isLayerActive = (store: Store, selection: (typeof LAYERS_SELECTION)[number]) => {
  if (selection === 'speedLimits') return store['mrsp'];
  if (selection === 'electricalProfiles') return store['electricalProfiles'];
  if (selection === 'powerRestrictions') return store['powerRestrictions'];
  if (selection === 'speedLimitTags') return store['speedLimitTags'];
  return true;
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

export const loadSvgImage = (svgUrl: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = svgUrl;
  });

export const createSvgBlobUrl = (svgString: string): string => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

/** Retrieve the index of an element in the list.
 * If the element is not found, return the predecessor.
 * If the element is smaller than the first element, return 0.
 * If the element is greater than the last element, return the last index.
 * If the list is empty, return -1.
 * @param data - The **sorted** data array.
 * @param element - The element to search
 * @param lambda - The function to extract the value from the data list.
 */
export const binarySearch = <T>(data: T[], element: number, lambda: (element: T) => number) => {
  if (data.length === 0) {
    return -1;
  } else if (element < lambda(data[0])) {
    return 0;
  } else if (element > lambda(data[data.length - 1])) {
    return data.length - 1;
  }

  let left = 0;
  let right = data.length;
  while (left < right) {
    const m = Math.floor((left + right) / 2);
    if (lambda(data[m]) < element) {
      left = m + 1;
    } else {
      right = m;
    }
  }

  if (element !== lambda(data[left])) {
    left--;
  }

  return left;
};

/** Convert meters to kilometers */
export const convertMToKm = (meters: number) => meters / 1000;

/** Transform a position in km into a position on the x-axis in pixels */
export const positionToPosX = (
  position: number,
  maxPosition: number,
  width: number,
  ratioX: number,
  leftOffset = 0
) => {
  const xWidth = width - MARGINS.MARGIN_LEFT - MARGINS.MARGIN_RIGHT - MARGINS.CURVE_MARGIN_SIDES;
  const leftMargin = MARGINS.CURVE_MARGIN_SIDES / 2 + MARGINS.MARGIN_LEFT + leftOffset;
  return (position / maxPosition) * (xWidth * ratioX) + leftMargin;
};

/** Interpole on a straight line given two points and the x-axis value */
export const interpolate = (x1: number, y1: number, x2: number, y2: number, x: number) => {
  if (x1 === x2) {
    return y1;
  }
  return y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
};

/** Clamps the given value between the given minimum number and maximum number values */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Filter stops to avoid overlapping draw */
export const filterStops = (
  stops: LayerData<string>[],
  ratioX: number,
  width: number,
  maxPosition: number,
  minSpace = 8
) => {
  let lastDisplayedPosX: number | null = null;

  const filteredStops = stops.filter(({ position }) => {
    const posX = positionToPosX(position.start, maxPosition, width, ratioX);
    if (lastDisplayedPosX !== null && Math.abs(posX - lastDisplayedPosX) < minSpace) {
      return false;
    }
    lastDisplayedPosX = posX;
    return true;
  });

  return filteredStops;
};

/** Compute the cursor position on the x-axis given its position on the canva */
export const getCursorPosition = (cursorX: number, width: number, store: Store) => {
  const { ratioX, leftOffset } = store;
  const maxPosition = maxPositionValue(store.speeds);
  const x = cursorX - leftOffset - MARGINS.CURVE_MARGIN_SIDES / 2;
  const maxX =
    (width - MARGINS.MARGIN_LEFT - MARGINS.MARGIN_RIGHT - MARGINS.CURVE_MARGIN_SIDES) * ratioX;
  return (x * maxPosition) / maxX;
};

/**
 * Retrieve the snapped stop given the cursor position.
 * If the cursor is not close enough to a stop, return null.
 */
export const getSnappedStop = (cursorX: number, width: number, store: Store) => {
  const { ratioX, leftOffset, stops } = store;
  const maxPosition = maxPositionValue(store.speeds);

  // Search for the closest stop to the cursor
  const filteredStops = filterStops(stops, ratioX, width, maxPosition);
  let closestStopIndex: number = 0;
  if (filteredStops.length > 1) {
    const cursorPosition = clamp(getCursorPosition(cursorX, width, store), 0, maxPosition);
    const index = binarySearch(
      filteredStops,
      cursorPosition,
      (element: LayerData<string>) => element.position.start
    );

    const nextIndex = Math.min(index + 1, filteredStops.length - 1);
    const leftDist = cursorPosition - filteredStops[index].position.start;
    const rightDist = filteredStops[nextIndex].position.start - cursorPosition;
    closestStopIndex = leftDist < rightDist ? index : nextIndex;
  } else if (filteredStops.length === 1) {
    closestStopIndex = 0;
  } else {
    return null;
  }

  // Check if the closest stop is close enough to the cursor
  const stopPosition = filteredStops[closestStopIndex].position.start;
  const stopPosX = positionToPosX(stopPosition, maxPosition, width, ratioX, leftOffset);
  if (Math.abs(stopPosX - (cursorX + MARGINS.MARGIN_LEFT)) < CURSOR_SNAP_DISTANCE) {
    return filteredStops[closestStopIndex];
  }
  return null;
};
