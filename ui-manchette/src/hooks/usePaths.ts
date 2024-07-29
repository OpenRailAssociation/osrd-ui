import { useMemo } from 'react';

import { type ProjectPathTrainResult, type SpaceTimeCurves } from '../types';

const transformCurve = (curve: SpaceTimeCurves, departureTime: string) =>
  curve.positions.map((position, i) => ({
    time: curve.times[i] + new Date(departureTime).getTime(),
    position,
  }));

const usePaths = (projectPathTrainResult: ProjectPathTrainResult[]) =>
  useMemo(
    () =>
      projectPathTrainResult.map((path, index) => ({
        id: path.departure_time,
        label: `Train ${index + 1}`,
        color: '#000000',
        points: path.space_time_curves.flatMap((curve) =>
          transformCurve(curve, path.departure_time)
        ),
      })),
    [projectPathTrainResult]
  );

export default usePaths;
