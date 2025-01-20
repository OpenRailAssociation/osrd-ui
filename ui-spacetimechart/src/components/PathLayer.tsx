import { useCallback } from 'react';

import { inRange, last } from 'lodash';

import { CAPTION_SIZE } from './TimeCaptions';
import { useDraw, usePicking } from '../hooks/useCanvas';
import {
  type DataPoint,
  DEFAULT_PATH_END,
  type DrawingFunction,
  type OperationalPoint,
  type PathData,
  type PickingDrawingFunction,
  type Point,
  type SpaceTimeChartContextType,
} from '../lib/types';
import { drawAliasedDisc, drawAliasedLine, drawPathExtremity } from '../utils/canvas';
import { indexToColor, hexToRgb } from '../utils/colors';
import { getSpaceBreakpoints } from '../utils/scales';

function getDirection({ points }: PathData, reverse?: boolean): 'up' | 'down' {
  if (points.length < 2) return 'down';

  if (!reverse) {
    for (let i = 1, l = Math.min(3, points.length); i < l; i++) {
      const diff = points[i].position - points[i - 1].position;
      if (diff > 0) return 'up';
      if (diff < 0) return 'down';
    }
  } else {
    for (let i = points.length - 2, l = Math.max(points.length - 4, points.length); i > l; i--) {
      const diff = points[i].position - points[i + 1].position;
      if (diff > 0) return 'up';
      if (diff < 0) return 'down';
    }
  }

  return 'down';
}

const DEFAULT_PICKING_TOLERANCE = 5;
const PAUSE_THICKNESS = 7;
const PAUSE_OPACITY = 0.2;

type PathStyle = {
  width: number;
  endWidth: number;
  dashArray?: number[];
  opacity?: number;
  lineCap?: CanvasLineCap;
};
export type PathLevel = 1 | 2 | 3 | 4;
const STYLES: Record<PathLevel, PathStyle> = {
  1: {
    width: 1.5,
    endWidth: 1.5,
  },
  2: {
    width: 1,
    endWidth: 1,
  },
  3: {
    width: 1,
    endWidth: 1,
    dashArray: [5, 5],
    lineCap: 'square',
  },
  4: {
    width: 1.5,
    endWidth: 1,
    dashArray: [0, 4],
    lineCap: 'round',
  },
} as const;
export const DEFAULT_LEVEL: PathLevel = 2;

export type PathLayerProps = {
  path: PathData;
  // Style:
  color: string;
  pickingTolerance?: number;
  level?: PathLevel;
};

/**
 * This component handles drawing a Path inside a SpaceTimeChart. It renders:
 * - The path itself
 * - The pauses
 * - The "picking" shape (to handle interactions)
 */
export const PathLayer = ({
  path,
  color,
  level = DEFAULT_LEVEL,
  pickingTolerance = DEFAULT_PICKING_TOLERANCE,
}: PathLayerProps) => {
  /**
   * This function returns the list of points to join to draw the path. It will be both used to
   * render the visible path, and the segments on the picking layer.
   */
  const getPathSegments = useCallback(
    ({
      getTimePixel,
      getSpacePixel,
      spaceScaleTree,
      timeAxis,
      spaceAxis,
    }: SpaceTimeChartContextType): Point[] => {
      const res: Point[] = [];
      path.points.forEach(({ position, time }, i, a) => {
        if (!i) {
          res.push({
            [timeAxis]: getTimePixel(time),
            [spaceAxis]: getSpacePixel(position),
          } as Point);
        } else {
          const { position: prevPosition, time: prevTime } = a[i - 1];
          const spaceBreakPoints = getSpaceBreakpoints(prevPosition, position, spaceScaleTree);
          spaceBreakPoints.forEach((breakPosition) => {
            const breakTime =
              prevTime +
              ((breakPosition - prevPosition) / (position - prevPosition)) * (time - prevTime);
            res.push({
              [timeAxis]: getTimePixel(breakTime),
              [spaceAxis]: getSpacePixel(breakPosition),
            } as Point);
          });
          res.push({
            [timeAxis]: getTimePixel(time),
            [spaceAxis]: getSpacePixel(position),
          } as Point);
        }
      });
      return res;
    },
    [path]
  );
  /**
   * This function returns the list of important points, where the mouse can snap.
   */
  const getSnapPoints = useCallback(
    ({
      getTimePixel,
      getSpacePixel,
      timeAxis,
      spaceAxis,
      operationalPoints,
    }: SpaceTimeChartContextType): Point[] => {
      const res: Point[] = [];
      const stopPositions = new Set(operationalPoints.map((p) => p.position));
      path.points.forEach(({ position, time }) => {
        if (stopPositions.has(position))
          res.push({
            [timeAxis]: getTimePixel(time),
            [spaceAxis]: getSpacePixel(position),
          } as Point);
      });
      return res;
    },
    [path]
  );

  /**
   * This function draws the stops of the path on the operational points.
   */
  const drawPauses = useCallback<DrawingFunction>(
    (ctx, { getTimePixel, getSpacePixel, operationalPoints, swapAxis }) => {
      const stopPositions = new Set(operationalPoints.map((p) => p.position));
      path.points.forEach(({ position, time }, i, a) => {
        if (i) {
          const { position: prevPosition, time: prevTime } = a[i - 1];
          if (prevPosition === position && stopPositions.has(position)) {
            const spacePixel = getSpacePixel(position);
            ctx.beginPath();
            if (!swapAxis) {
              ctx.moveTo(getTimePixel(prevTime), spacePixel);
              ctx.lineTo(getTimePixel(time), spacePixel);
            } else {
              ctx.moveTo(spacePixel, getTimePixel(prevTime));
              ctx.lineTo(spacePixel, getTimePixel(time));
            }
            ctx.stroke();
          }
        }
      });
    },
    [path]
  );

  /**
   * This function draws the label of the path.
   */
  const drawLabel = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      {
        width,
        height,
        swapAxis,
        theme: {
          background,
          pathsStyles: { fontSize, fontFamily },
        },
      }: SpaceTimeChartContextType,
      label: string,
      labelColor: string,
      points: Point[],
      pathLength: number
    ) => {
      if (!label) return;

      const firstPointOnScreenIndex = points.findIndex(({ x, y }) =>
        !swapAxis
          ? inRange(x, 0, width) && inRange(y, 0, height - CAPTION_SIZE)
          : inRange(x, CAPTION_SIZE, width) && inRange(y, 0, height)
      );

      if (firstPointOnScreenIndex < 0) return;

      const prev = points[firstPointOnScreenIndex - 1];
      const curr = points[firstPointOnScreenIndex];
      const next = points[firstPointOnScreenIndex + 1];

      let position: Point = curr;
      let angle = 0;

      if (firstPointOnScreenIndex === 0) {
        if (next) angle = Math.atan2(next.y - curr.y, next.x - curr.x);
      } else {
        const slope = (curr.y - prev.y) / (curr.x - prev.x);
        const yOnYAxisIntersect = curr.y - curr.x * slope;
        const xOnXAxisIntersect = curr.x - curr.y / slope;
        if (yOnYAxisIntersect >= 0) {
          position = {
            x: 0,
            y: yOnYAxisIntersect,
          };
        } else {
          position = {
            x: xOnXAxisIntersect + 10 / slope,
            y: 10,
          };
        }

        angle = Math.atan2(curr.y - prev.y, curr.x - prev.x);
      }

      // Finally, draw label:
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(angle);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'start';

      const padding = 2;
      const measure = ctx.measureText(label);
      const w = measure.width + 2 * padding;
      const actualBoundingBoxHeight =
        measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
      const h = actualBoundingBoxHeight + 2 * padding;

      const dx = w < pathLength ? 5 : (pathLength - w) / 2; // Progressively center the label if the path is shorter than the label
      const dy = angle >= 0 ? -5 : 15;
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = background;
      ctx.fillRect(dx - padding, dy - h + padding, w, h);
      ctx.fillStyle = labelColor;
      ctx.globalAlpha = 1;
      ctx.fillText(label, dx, dy);
      ctx.restore();
    },
    []
  );

  /**
   * This function draws the extremities of the path.
   */
  const drawExtremities = useCallback<DrawingFunction>(
    (ctx, { getTimePixel, getSpacePixel, swapAxis }) => {
      if (!path.points.length) return;

      const pathDirection = getDirection(path);
      const from = path.points[0];
      const fromEnd = path.fromEnd || DEFAULT_PATH_END;
      const to = last(path.points) as DataPoint;
      const toEnd = path.toEnd || DEFAULT_PATH_END;

      drawPathExtremity(
        ctx,
        getTimePixel(from.time),
        getSpacePixel(from.position),
        swapAxis,
        'from',
        pathDirection,
        fromEnd
      );
      drawPathExtremity(
        ctx,
        getTimePixel(to.time),
        getSpacePixel(to.position),
        swapAxis,
        'to',
        pathDirection,
        toEnd
      );
    },
    [path]
  );

  const computePathLength = useCallback(
    (operationalPoints: OperationalPoint[], segments: Point[]) => {
      let totalLength = 0;

      // Compute length of pauses
      const stopPositions = new Set(operationalPoints.map((p) => p.position));
      path.points.forEach(({ position, time }, i, pointsArray) => {
        if (i > 0) {
          const { position: prevPosition, time: prevTime } = pointsArray[i - 1];
          if (prevPosition === position && stopPositions.has(position)) {
            totalLength += time - prevTime;
          }
        }
      });

      // Compute length of pathSegments
      segments.forEach(({ x, y }, i, segmentArray) => {
        if (i > 0) {
          const { x: prevX, y: prevY } = segmentArray[i - 1];
          totalLength += Math.sqrt(Math.pow(prevX - x, 2) + Math.pow(prevY - y, 2));
        }
      });

      return totalLength;
    },
    [path]
  );

  const drawAll = useCallback<DrawingFunction>(
    (ctx, stcContext) => {
      // Draw stops:
      ctx.strokeStyle = color;
      ctx.lineWidth = PAUSE_THICKNESS;
      ctx.globalAlpha = PAUSE_OPACITY;
      ctx.lineCap = 'round';
      drawPauses(ctx, stcContext);

      const style = STYLES[level];

      // Draw main path:
      ctx.strokeStyle = color;
      ctx.lineWidth = style.width;
      ctx.setLineDash(style.dashArray || []);
      ctx.globalAlpha = style.opacity || 1;
      ctx.lineCap = style.lineCap || 'square';
      ctx.beginPath();
      const segments = getPathSegments(stcContext);
      segments.forEach(({ x, y }, i) => {
        if (!i) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw extremities:
      ctx.setLineDash([]);
      ctx.lineWidth = style.endWidth;
      drawExtremities(ctx, stcContext);

      // Draw label:
      if (!stcContext.hidePathsLabels) {
        const pathLength = computePathLength(stcContext.operationalPoints, segments);
        drawLabel(ctx, stcContext, path.label, color, segments, pathLength);
      }
    },
    [
      color,
      drawPauses,
      level,
      getPathSegments,
      drawExtremities,
      computePathLength,
      drawLabel,
      path.label,
    ]
  );
  useDraw('paths', drawAll);

  const drawPicking = useCallback<PickingDrawingFunction>(
    (imageData, stcContext) => {
      const { registerPickingElement } = stcContext;

      // Draw segments:
      getPathSegments(stcContext).forEach((point, i, a) => {
        if (i) {
          const previousPoint = a[i - 1];
          const index = registerPickingElement({
            type: 'segment',
            pathId: path.id,
            from: previousPoint,
            to: point,
          });
          const lineColor = hexToRgb(indexToColor(index));
          drawAliasedLine(
            imageData,
            previousPoint,
            point,
            lineColor,
            STYLES[level].width + pickingTolerance,
            true
          );
        }
      });

      // Draw snap points:
      getSnapPoints(stcContext).forEach((point) => {
        const index = registerPickingElement({
          type: 'point',
          pathId: path.id,
          point,
        });
        const lineColor = hexToRgb(indexToColor(index));
        drawAliasedDisc(
          imageData,
          point,
          (STYLES[level].width + pickingTolerance) * 2,
          lineColor,
          false
        );
      });
    },
    [getPathSegments, getSnapPoints, level, path.id, pickingTolerance]
  );
  usePicking('paths', drawPicking);

  return null;
};

export default PathLayer;
