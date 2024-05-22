import { clamp } from 'lodash';

import { type PathEnd, type Point, type RGBAColor, type RGBColor } from '../lib/types';

/**
 * This function draws a thick lines from "from" to "to" on the given ImageData, with no
 * antialiasing. This is very useful to handle picking, since it is not possible to disable
 * antialiasing with the native JavaScript canvas APIs.
 */
export function drawAliasedLine(
  imageData: ImageData,
  from: Point,
  to: Point,
  [r, g, b]: RGBColor | RGBAColor,
  thickness: number,
  drawOnBottom: boolean,
  number: number = Math.ceil(thickness / 2)
): void {
  if (from.x > to.x)
    return drawAliasedLine(imageData, to, from, [r, g, b], thickness, drawOnBottom);

  const width = imageData.width;
  const height = imageData.height;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  // Calculate perpendicular vector
  const normX = -dy / len;
  const normY = dx / len;

  // Calculate the four corners of the rectangle
  const halfThickness = number;

  const corner1 = {
    x: from.x + (+normX - dx / len) * halfThickness,
    y: from.y + (+normY - dy / len) * halfThickness,
  };
  const corner2 = {
    x: from.x + (-normX - dx / len) * halfThickness,
    y: from.y + (-normY - dy / len) * halfThickness,
  };
  const corner3 = {
    x: to.x + (-normX + dx / len) * halfThickness,
    y: to.y + (-normY + dy / len) * halfThickness,
  };
  const corner4 = {
    x: to.x + (+normX + dx / len) * halfThickness,
    y: to.y + (+normY + dy / len) * halfThickness,
  };

  const ascending = from.y < to.y;
  const top = ascending ? corner4 : corner1;
  const left = ascending ? corner1 : corner2;
  const right = ascending ? corner3 : corner4;
  const bottom = ascending ? corner2 : corner3;

  const xMin = clamp(Math.floor(left.x), 0, width);
  const xMax = clamp(Math.ceil(right.x), 0, width);
  const yMin = clamp(Math.floor(bottom.y), 0, height);
  const yMax = clamp(Math.ceil(top.y), 0, height);

  for (let y = yMin; y <= yMax; y++) {
    const xMinRow = clamp(
      y < left.y
        ? Math.floor(bottom.x + ((y - bottom.y) * (left.x - bottom.x)) / (left.y - bottom.y))
        : Math.floor(left.x + ((y - left.y) * (left.x - top.x)) / (left.y - top.y)),
      xMin,
      xMax
    );
    const xMaxRow = clamp(
      y < right.y
        ? Math.ceil(bottom.x + ((y - bottom.y) * (right.x - bottom.x)) / (right.y - bottom.y))
        : Math.ceil(right.x + ((y - right.y) * (right.x - top.x)) / (right.y - top.y)),
      xMin,
      xMax
    );

    for (let x = xMinRow; x <= xMaxRow; x++) {
      const index = (y * width + x) * 4;
      if (!drawOnBottom || !imageData.data[index + 3]) {
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = 255;
      }
    }
  }
}

/**
 * This function takes an integer radius, and returns a flat matrix of 1s and 0s, where the 1s
 * represent the pixels that are within the disc. The shapes are cached, to make it faster to draw
 * a lot of times discs of the same radius.
 *
 * Here are some examples to make it clearer what the output should look like:
 *
 * getAliasedDiscShape(0);
 * // [1]
 * getAliasedDiscShape(1);
 * // [0, 1, 0,
 * //  1, 1, 1,
 * //  0, 1, 0]
 * getAliasedDiscShape(2);
 * // [0, 0, 1, 0, 0,
 * //  0, 1, 1, 1, 0,
 * //  1, 1, 1, 1, 1,
 * //  0, 1, 1, 1, 0,
 * //  0, 0, 1, 0, 0]
 */
const DISCS_CACHE: Map<number, Uint8Array> = new Map();
export function getAliasedDiscShape(radius: number): Uint8Array {
  const cachedShape = DISCS_CACHE.get(radius);
  if (cachedShape) return cachedShape;

  const diameter = radius * 2 + 1;
  const shape = new Uint8Array(diameter * diameter);

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const distance = dx * dx + dy * dy;
      if (distance <= radius * radius) {
        const x = dx + radius;
        const y = dy + radius;
        shape[y * diameter + x] = 1;
      }
    }
  }

  DISCS_CACHE.set(radius, shape);
  return shape;
}

/**
 * This function draws an aliased disc, using a shape computed by getDiscShape.
 */
export function drawAliasedDisc(
  imageData: ImageData,
  { x: centerX, y: centerY }: Point,
  radius: number,
  [r, g, b]: RGBColor | RGBAColor,
  drawOnBottom: boolean
): void {
  centerX = Math.round(centerX);
  centerY = Math.round(centerY);
  radius = Math.ceil(radius);

  const { width, height } = imageData;

  const discShape = getAliasedDiscShape(radius);

  // Draw the disc on the imageData
  const diameter = radius * 2 + 1;
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const shapeIndex = (dy + radius) * diameter + (dx + radius);
      if (discShape[shapeIndex] === 1) {
        const x = centerX + dx;
        const y = centerY + dy;
        if (x >= 0 && x < width && y >= 0 && y < height) {
          const index = (y * width + x) * 4;
          if (!drawOnBottom || !imageData.data[index + 3]) {
            imageData.data[index] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = 255;
          }
        }
      }
    }
  }
}

/**
 * This function draws a "stop" path extremity.
 * That handles a path that stops or starts exactly in an operational points included in the line
 * represented in the chart.
 */
const STOP_END_SIZE = 6;
export function drawPathStopExtremity(
  ctx: CanvasRenderingContext2D,
  timePixel: number,
  spacePixel: number,
  swapAxis: boolean
): void {
  ctx.beginPath();
  if (!swapAxis) {
    ctx.moveTo(timePixel, spacePixel - STOP_END_SIZE / 2);
    ctx.lineTo(timePixel, spacePixel + STOP_END_SIZE / 2);
  } else {
    ctx.moveTo(spacePixel - STOP_END_SIZE / 2, timePixel);
    ctx.lineTo(spacePixel + STOP_END_SIZE / 2, timePixel);
  }
  ctx.stroke();
}

/**
 * This function draws an "out" path extremity.
 * That handles a path that leaves or joins the line represented in the chart.
 */
const OUT_END_SIZE = 12;
export function drawPathOutExtremity(
  ctx: CanvasRenderingContext2D,
  timePixel: number,
  spacePixel: number,
  swapAxis: boolean,
  extremityType: 'from' | 'to',
  pathDirection: 'up' | 'down'
): void {
  let horizontalSign = extremityType === 'from' ? -1 : 1;
  let verticalSign = (pathDirection === 'down' ? -1 : 1) * horizontalSign;
  let controlX = timePixel + 4 * horizontalSign;
  let controlY = spacePixel + (OUT_END_SIZE - 2) * verticalSign;
  let x = timePixel;
  let y = spacePixel;
  if (swapAxis) {
    [horizontalSign, verticalSign] = [verticalSign, horizontalSign];
    [controlX, controlY] = [controlY, controlX];
    [x, y] = [y, x];
  }

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(
    controlX,
    controlY,
    controlX,
    controlY,
    x + OUT_END_SIZE * horizontalSign,
    y + OUT_END_SIZE * verticalSign
  );
  ctx.stroke();
}

/**
 * This function draws a path extremity.
 */
export function drawPathExtremity(
  ctx: CanvasRenderingContext2D,
  timePixel: number,
  spacePixel: number,
  swapAxis: boolean,
  extremityType: 'from' | 'to',
  pathDirection: 'up' | 'down',
  pathEnd: PathEnd
): void {
  if (pathEnd === 'out') {
    drawPathOutExtremity(ctx, timePixel, spacePixel, swapAxis, extremityType, pathDirection);
  } else {
    drawPathStopExtremity(ctx, timePixel, spacePixel, swapAxis);
  }
}
