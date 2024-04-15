import { clamp } from 'lodash';

import {
  NormalizedScaleTree,
  NormalizedScale,
  SpaceScale,
  SpaceToPixel,
  TimeToPixel,
  PixelToTime,
  PixelToSpace,
  PointToData,
  Point,
  DataToPoint,
  DataPoint,
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
      throw new Error('Invalid scales: there should be at least one scale.');
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
// time/space space:
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
  return (x: number) => (x - pixelOffset) * timeScale + timeOrigin;
}

export function getSpaceToPixel(
  spaceOrigin: number,
  pixelOffset: number,
  binaryTree: NormalizedScaleTree
): SpaceToPixel {
  return (position: number) => {
    const { from, pixelFrom, coefficient } = getNormalizedScaleAtPosition(
      position - spaceOrigin,
      binaryTree
    );
    return pixelOffset + pixelFrom + (position - from) / coefficient;
  };
}

export function getPixelToSpace(
  spaceOrigin: number,
  pixelOffset: number,
  binaryTree: NormalizedScaleTree
): PixelToSpace {
  return (y: number) => {
    const { from, pixelFrom, coefficient } = getNormalizedScaleAtPixel(y - pixelOffset, binaryTree);
    return spaceOrigin + from + (y - pixelOffset - pixelFrom) * coefficient;
  };
}

export function getPointToData(getTime: PixelToTime, getSpace: PixelToSpace): PointToData {
  return ({ x, y }: Point) => ({
    time: getTime(x),
    position: getSpace(y),
  });
}

export function getDataToPoint(getX: TimeToPixel, getY: SpaceToPixel): DataToPoint {
  return ({ time, position }: DataPoint) => ({
    x: getX(time),
    y: getY(position),
  });
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
