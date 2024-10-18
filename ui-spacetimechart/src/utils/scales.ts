import { clamp, inRange } from 'lodash';

import {
  type NormalizedScaleTree,
  type NormalizedScale,
  type SpaceScale,
  type SpaceToPixel,
  type TimeToPixel,
  type PixelToTime,
  type PixelToSpace,
  type PointToData,
  type Point,
  type DataToPoint,
  type DataPoint,
  type Axis,
  type PathData,
} from '../lib/types';

/**
 * This function helps to index a sequence of consecutive scales into a binary tree, to make it
 * faster to find which scale contains any given position.
 *
 * The optional `skipSiblingReferences` option allows getting a serializable tree, for testing
 * purpose.
 */
export function spaceScalesToBinaryTree(
  spaceOrigin: number,
  spaceScales: SpaceScale[],
  skipSiblingReferences?: boolean
): NormalizedScaleTree {
  let prev = spaceOrigin;

  // Step 1: Validate the scales
  if (
    spaceScales.some((scale) => {
      if (scale.to < prev) return true;
      prev = scale.to;
      return false;
    })
  ) {
    throw new Error("Invalid scale: 'to' must be greater than previous 'to'.");
  }

  if (spaceScales.some((scale) => ('size' in scale ? scale.size : scale.coefficient) <= 0)) {
    throw new Error("Invalid scale: 'to' must be greater than 'from'.");
  }

  // Step 2: Normalize the scales
  const normalizedScales: NormalizedScale[] = [];
  let offset = 0;
  prev = spaceOrigin;
  for (let i = 0; i < spaceScales.length; i++) {
    const scale = spaceScales[i];
    const coefficient = 'coefficient' in scale ? scale.coefficient : (scale.to - prev) / scale.size;
    const size = 'coefficient' in scale ? (scale.to - prev) / scale.coefficient : scale.size;
    normalizedScales.push({
      from: prev,
      to: scale.to,
      pixelFrom: offset,
      pixelTo: offset + size,
      coefficient,
    });
    offset += size;
    prev = scale.to;

    if (!skipSiblingReferences && i) {
      normalizedScales[i].previous = normalizedScales[i - 1];
      normalizedScales[i - 1].next = normalizedScales[i];
    }
  }

  // Step 3: Build the tree
  function buildTree(scales: NormalizedScale[]): NormalizedScaleTree {
    if (scales.length === 0) {
      return {
        coefficient: 1,
        from: -Infinity,
        to: Infinity,
        pixelFrom: -Infinity,
        pixelTo: Infinity,
      };
    } else if (scales.length === 1) {
      return scales[0];
    } else {
      const size = Math.ceil(scales.length / 2);
      const limit = scales[size - 1].to;
      const pixelLimit = scales[size - 1].pixelTo;
      return {
        limit,
        pixelLimit,
        from: scales[0].from,
        to: scales[scales.length - 1].to,
        pixelFrom: scales[0].pixelFrom,
        pixelTo: scales[scales.length - 1].pixelTo,
        left: buildTree(scales.slice(0, size)),
        right: buildTree(scales.slice(size)),
      };
    }
  }

  return buildTree(normalizedScales);
}

/**
 * This function takes a NormalizedScaleTree and a position, and returns the leaf node from the
 * tree that contains that position.
 *
 * Also, if the position is lower than the tree's min (tree.from), then the first leaf is returned
 * and if it is higher than the max (tree.to), the last leaf is returned.
 */
export function getNormalizedScaleAtPosition(
  position: number,
  tree: NormalizedScaleTree
): NormalizedScale {
  position = clamp(position, tree.from, tree.to);

  let node = tree;
  while ('limit' in node) {
    if (position <= node.limit) node = node.left;
    else node = node.right;
  }
  return node;
}

/**
 * This function takes a NormalizedScaleTree and a pixel position, and returns the leaf node from
 * the tree that contains that pixel.
 *
 * Also, if the position is lower than the tree's min pixel (tree.pixelFrom), then the first leaf
 * is returned and if it is higher than the max pixel (tree.pixelTo), the last leaf is returned.
 */
export function getNormalizedScaleAtPixel(y: number, tree: NormalizedScaleTree): NormalizedScale {
  y = clamp(y, tree.pixelFrom, tree.pixelTo);

  let node = tree;
  while ('pixelLimit' in node) {
    if (y <= node.pixelLimit) node = node.left;
    else node = node.right;
  }
  return node;
}

// The following functions handle various kinds of data translation from the pixel space to the
// time/space referential:
export function getTimeToPixel(
  timeOrigin: number,
  pixelOffset: number,
  timeScale: number
): TimeToPixel {
  return (time: number) => pixelOffset + (time - timeOrigin) / timeScale;
}

export function getPixelToTime(
  timeOrigin: number,
  pixelOffset: number,
  timeScale: number
): PixelToTime {
  return (timePixel: number) => (timePixel - pixelOffset) * timeScale + timeOrigin;
}

export function getSpaceToPixel(
  pixelOffset: number,
  binaryTree: NormalizedScaleTree
): SpaceToPixel {
  return (position: number) => {
    const { from, pixelFrom, coefficient } = getNormalizedScaleAtPosition(position, binaryTree);
    return pixelOffset + pixelFrom + (position - from) / coefficient;
  };
}

export function getPixelToSpace(
  spaceOrigin: number,
  pixelOffset: number,
  binaryTree: NormalizedScaleTree
): PixelToSpace {
  return (spacePixel: number) => {
    const { from, pixelFrom, coefficient } = getNormalizedScaleAtPixel(
      spacePixel - pixelOffset,
      binaryTree
    );
    return spaceOrigin + from + (spacePixel - pixelOffset - pixelFrom) * coefficient;
  };
}

export function getPointToData(
  getTime: PixelToTime,
  getSpace: PixelToSpace,
  timeAxis: Axis,
  spaceAxis: Axis
): PointToData {
  return (point: Point) => ({
    time: getTime(point[timeAxis]),
    position: getSpace(point[spaceAxis]),
  });
}

export function getDataToPoint(
  getTimePixel: TimeToPixel,
  getSpacePixel: SpaceToPixel,
  timeAxis: Axis,
  spaceAxis: Axis
): DataToPoint {
  return ({ time, position }: DataPoint) =>
    ({
      [timeAxis]: getTimePixel(time),
      [spaceAxis]: getSpacePixel(position),
    }) as Point;
}

/**
 * This function takes a path and a time, a returns the position of the train at the given time, or
 * the position at the closest time to the path existence.
 */
export function getSpaceAtTime(path: PathData, time: number): number {
  const segments = path.points.slice(0, -1).map((p, i) => [p, path.points[i + 1]]);
  const matchingSegment = segments.find(([p1, p2]) => inRange(time, p1.time, p2.time));

  if (matchingSegment) {
    const [p1, p2] = matchingSegment;
    return p1.position + ((time - p1.time) / (p2.time - p1.time)) * (p2.position - p1.position);
  }

  let minPoint = path.points[0];
  let maxPoint = path.points[0];
  path.points.slice(1).forEach((point) => {
    if (point.time < minPoint.time) minPoint = point;
    if (point.time > maxPoint.time) maxPoint = point;
  });

  if (minPoint.time > time) return minPoint.position;
  return maxPoint.position;
}

/**
 * This function helps to find where to "break" a straight line that crosses separations between
 * different time scales. It takes two positions (in the "space" space), and returns an array of
 * positions between these the two input positions (the array can be empty).
 */
export function getSpaceBreakpoints(from: number, to: number, tree: NormalizedScaleTree): number[] {
  if (to < from) return getSpaceBreakpoints(to, from, tree).reverse();

  from = Math.max(from, tree.from);
  to = Math.min(to, tree.to);

  let fromScale = getNormalizedScaleAtPosition(from, tree) as NormalizedScale;
  let lastValue = from;
  const res: number[] = [];
  while (fromScale.to < to) {
    if (fromScale.to !== lastValue) res.push(fromScale.to);
    lastValue = fromScale.to;
    fromScale = fromScale.next as NormalizedScale;
  }

  return res;
}
