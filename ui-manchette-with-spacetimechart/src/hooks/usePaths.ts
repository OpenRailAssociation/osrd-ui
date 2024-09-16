import { useMemo } from 'react';

import {
  type ProjectPathTrainResult,
  type SpaceTimeCurves,
} from '@osrd-project/ui-manchette/dist/types'; 

const transformCurve = (curve: SpaceTimeCurves, departureTime: string) =>
  curve.positions.map((position, i) => ({
    time: curve.times[i] + new Date(departureTime).getTime(),
    position,
  }));

const usePaths = (projectPathTrainResult: ProjectPathTrainResult[], selectedTrain?: number) =>
  useMemo(
    () =>
      projectPathTrainResult.flatMap((path) =>
        path.space_time_curves.map((spaceTimeCurve, ind) => ({
          id: `${path.id}-${ind}`,
          label: path.name,
          color: selectedTrain && selectedTrain === path.id ? '#201EDE' : '#000000',
          points: transformCurve(spaceTimeCurve, path.departure_time),
        }))
      ),
    [projectPathTrainResult, selectedTrain]
  );

export default usePaths;
