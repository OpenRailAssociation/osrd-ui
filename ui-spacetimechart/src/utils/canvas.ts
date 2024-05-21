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
  number: number = Math.ceil(thickness / 2)
): void {
  if (from.x > to.x) return drawAliasedLine(imageData, to, from, [r, g, b], thickness);

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
      const idx = (y * width + x) * 4;
      imageData.data[idx] = r;
      imageData.data[idx + 1] = g;
      imageData.data[idx + 2] = b;
      imageData.data[idx + 3] = 255;
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
