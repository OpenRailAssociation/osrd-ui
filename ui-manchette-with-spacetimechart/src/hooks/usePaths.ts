/* eslint-disable import/no-unresolved */
import { useMemo } from 'react';

import { type ProjectPathTrainResult } from '@osrd-project/ui-manchette/dist/types';
import { type PathLevel } from '@osrd-project/ui-spacetimechart';

import { PATH_COLOR_DEFAULT } from '../consts';

const transformCurve = (curve: ProjectPathTrainResult['spaceTimeCurves'][0], departureTime: Date) =>
  curve.positions.map((position, i) => ({
    time: curve.times[i] + departureTime.getTime(),
    position,
  }));

const usePaths = (projectPathTrainResult: ProjectPathTrainResult[], selectedTrain?: number) =>
  useMemo(
    () =>
      projectPathTrainResult.flatMap((path) =>
        path.spaceTimeCurves.map<{
          id: string;
          label: string;
          color: string;
          level: PathLevel;
          points: { time: number; position: number }[];
        }>((spaceTimeCurve, ind) => ({
          id: `${path.id}-${ind}`,
          label: path.name,
          color: PATH_COLOR_DEFAULT,
          level: selectedTrain && selectedTrain === path.id ? 1 : 2,
          points: transformCurve(spaceTimeCurve, path.departureTime),
        }))
      ),
    [projectPathTrainResult, selectedTrain]
  );

export default usePaths;
