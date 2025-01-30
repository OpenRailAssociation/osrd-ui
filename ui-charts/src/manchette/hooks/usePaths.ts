import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';

import { PATH_COLOR_DEFAULT } from '../consts';
import { type ProjectPathTrainResult } from '../types';

const transformCurve = (curve: ProjectPathTrainResult['spaceTimeCurves'][0], departureTime: Date) =>
  curve.positions.map((position, i) => ({
    time: curve.times[i] + departureTime.getTime(),
    position,
  }));

const computePaths = (projectPathTrainResult: ProjectPathTrainResult[]) =>
  projectPathTrainResult.flatMap((path) =>
    path.spaceTimeCurves.map<{
      id: string;
      label: string;
      points: { time: number; position: number }[];
      color: string;
    }>((spaceTimeCurve) => ({
      id: path.id,
      label: path.name,
      color: PATH_COLOR_DEFAULT,
      points: transformCurve(spaceTimeCurve, path.departureTime),
    }))
  );

const usePaths = (projectPathTrainResult: ProjectPathTrainResult[]) => {
  const [paths, setPaths] = useState(computePaths(projectPathTrainResult));
  useEffect(() => {
    console.log('transition');
    startTransition(() => {
      setPaths(computePaths(projectPathTrainResult));
    });
  }, [projectPathTrainResult]);

  return paths;
};

export default usePaths;
