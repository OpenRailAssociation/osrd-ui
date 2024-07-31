import { useMemo } from 'react';

import { type ProjectPathTrainResult, type SpaceTimeCurves } from '../types';

const transformCurve = (curve: SpaceTimeCurves, departureTime: string) =>
  curve.positions.map((position, i) => ({
    time: curve.times[i] + new Date(departureTime).getTime(),
    position,
  }));

const usePaths = (projectPathTrainResult: ProjectPathTrainResult[], selectedProjection?: number) =>
  useMemo(
    () =>
      projectPathTrainResult.map((path) => ({
        id: `${path.id}`,
        label: path.name,
        color: selectedProjection && selectedProjection === path.id ? '#201EDE' : '#000000',
        points: path.space_time_curves.flatMap((curve) =>
          transformCurve(curve, path.departure_time)
        ),
      })),
    [projectPathTrainResult, selectedProjection]
  );

export default usePaths;
