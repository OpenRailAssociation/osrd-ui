import { type OperationalPoint, type PathData } from '../../lib/types';

const KM = 1000;
const MIN = 60 * 1000;

export function getPaths<T extends object>(
  prefix: string,
  points: OperationalPoint[],
  pauseTime: number,
  offset: number,
  speed: number,
  count: number,
  t0: number,
  additionalAttributes: T
): (PathData & T)[] {
  const res: (PathData & T)[] = [];

  for (let i = 0; i < count; i++) {
    let t = t0 + i * offset;
    let p = points[0].position;
    const path: PathData & T = {
      id: `${prefix}-${i + 1}`,
      label: `Train ${prefix} ${i + 1}`,
      points: [
        {
          position: p,
          time: t,
        },
      ],
      ...additionalAttributes,
    };

    points.forEach((point, index) => {
      if (index) {
        const previousPoint = points[index - 1];
        // Travel:
        const travelDistance = point.position - previousPoint.position;
        const travelTime = travelDistance / speed;
        p += travelDistance;
        t += travelTime;
        path.points.push({
          position: p,
          time: t,
        });
      }

      // Stop:
      t += pauseTime;
      path.points.push({
        position: p,
        time: t,
      });
    });

    res.push(path);
  }

  return res;
}

export const OPERATIONAL_POINTS: OperationalPoint[] = [
  {
    id: 'city-a',
    label: 'Point A',
    position: 0 * KM,
    importanceLevel: 1,
  },
  {
    id: 'city-b',
    label: 'Point B',
    position: 10 * KM,
    importanceLevel: 2,
  },
  {
    id: 'city-c',
    label: 'Point C',
    position: 60 * KM,
    importanceLevel: 1,
  },
  {
    id: 'city-d',
    label: 'Point D',
    position: 70 * KM,
    importanceLevel: 2,
  },
  {
    id: 'city-e',
    label: 'Point E',
    position: 90 * KM,
    importanceLevel: 2,
  },
  {
    id: 'city-f',
    label: 'Point F',
    position: 140 * KM,
    importanceLevel: 1,
  },
];

const REVERSED_POINTS = OPERATIONAL_POINTS.slice(0).reverse();
const EXTREME_POINTS = [OPERATIONAL_POINTS[0], OPERATIONAL_POINTS[2], OPERATIONAL_POINTS[5]];
const REVERSED_EXTREME_POINTS = EXTREME_POINTS.slice(0).reverse();

export const START_DATE = new Date('2024/04/02');

export const PATHS: (PathData & { color: string })[] = [
  // Omnibuses:
  ...getPaths(
    'omnibus',
    OPERATIONAL_POINTS,
    3 * MIN,
    30 * MIN,
    (80 * KM) / (60 * MIN),
    5,
    +START_DATE,
    { color: '#FF362E' }
  ),
  ...getPaths(
    'omnibus-reversed',
    REVERSED_POINTS,
    3 * MIN,
    35 * MIN,
    -(80 * KM) / (60 * MIN),
    4,
    +START_DATE,
    { color: '#FF8E3D' }
  ),

  // Fast trains:
  ...getPaths('fast', EXTREME_POINTS, 5 * MIN, 50 * MIN, (140 * KM) / (60 * MIN), 3, +START_DATE, {
    color: '#526CE8',
    fromEnd: 'out',
    toEnd: 'out',
  }),
  ...getPaths(
    'fast-reversed',
    REVERSED_EXTREME_POINTS,
    5 * MIN,
    45 * MIN,
    -(140 * KM) / (60 * MIN),
    3,
    +START_DATE,
    { color: '#66C0F1', fromEnd: 'out', toEnd: 'out' }
  ),
];
