import type { DataPoint, Direction, PathData } from '../lib/types';

/**
 * This function takes a path, a point index and looks forward in the points order for the first
 * position variation. It then returns "forward" or "backward" according to that variation.
 *
 * If it does not find any variation for some reason, it returns "still" instead.
 *
 * Finally, if `reversed` is true, then, it searches points in the other direction.
 */
export function getPathDirection(
  { points }: PathData,
  index: number,
  reversed?: boolean
): Direction {
  if (points.length < 2 || !points[index]) return 'still';

  const reference = points[index].position;
  let i = index;
  let point: DataPoint | undefined;
  while ((point = points[i])) {
    if (point.position !== reference) {
      const delta = reversed ? reference - point.position : point.position - reference;
      return delta > 0 ? 'forward' : 'backward';
    }

    i = i + (reversed ? -1 : 1);
  }

  return 'still';
}
