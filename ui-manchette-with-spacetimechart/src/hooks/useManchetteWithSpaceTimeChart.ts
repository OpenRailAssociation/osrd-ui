import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ProjectPathTrainResult, Waypoint } from '@osrd-project/ui-manchette/dist/types';
import type {
  SpaceScale,
  SpaceTimeChartProps,
} from '@osrd-project/ui-spacetimechart/dist/lib/types';

import usePaths from './usePaths';
import {
  MAX_ZOOM_Y,
  MIN_ZOOM_Y,
  ZOOM_Y_DELTA,
  INITIAL_SPACE_TIME_CHART_HEIGHT,
  DEFAULT_ZOOM_MS_PER_PX,
} from '../consts';
import {
  calcWaypointsToDisplay,
  getWaypointsWithPosition as getOperationalPointWithPosition,
  getScales,
  calcWaypointsHeight,
  zoomX,
  zoomValueToTimeScale,
  timeScaleToZoomValue,
} from '../helpers';
import { getDiff } from '../utils/point';

type State = {
  xZoom: number;
  yZoom: number;
  xOffset: number;
  yOffset: number;
  panning: { initialOffset: { x: number; y: number } } | null;
  scrollPosition: number;
  isProportional: boolean;
  waypointsChart: Waypoint[];
  scales: SpaceScale[];
};

const useManchettesWithSpaceTimeChart = (
  waypoints: Waypoint[],
  projectPathTrainResult: ProjectPathTrainResult[],
  manchetteWithSpaceTimeChartContainer: React.RefObject<HTMLDivElement>,
  selectedTrain?: number,
  height = 561,
  spaceTimeChartRef?: React.RefObject<HTMLDivElement>
) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [state, setState] = useState<State>({
    xZoom: timeScaleToZoomValue(DEFAULT_ZOOM_MS_PER_PX),
    yZoom: 1,
    xOffset: 0,
    yOffset: 0,
    panning: null,
    scrollPosition: 0,
    isProportional: true,
    waypointsChart: [],
    scales: [],
  });

  const { xZoom, yZoom, xOffset, yOffset, panning, scrollPosition, isProportional } = state;

  const paths = usePaths(projectPathTrainResult, selectedTrain);

  const waypointsToDisplay = useMemo(
    () => calcWaypointsToDisplay(waypoints, { height, isProportional, yZoom }),
    [waypoints, height, isProportional, yZoom]
  );
  const waypointWithHeight = useMemo(
    () => calcWaypointsHeight(waypointsToDisplay, { height, isProportional, yZoom }),
    [waypointsToDisplay, height, yZoom, isProportional]
  );

  const operationalPointsWithPosition = useMemo(
    () => getOperationalPointWithPosition(waypointsToDisplay),
    [waypointsToDisplay]
  );

  const zoomYIn = useCallback(() => {
    if (yZoom < MAX_ZOOM_Y) {
      setState((prev) => ({ ...prev, yZoom: yZoom + ZOOM_Y_DELTA }));
    }
  }, [yZoom]);

  const zoomYOut = useCallback(() => {
    if (yZoom > MIN_ZOOM_Y) {
      setState((prev) => ({ ...prev, yZoom: yZoom - ZOOM_Y_DELTA }));
    }
  }, [yZoom]);

  const resetZoom = useCallback(() => {
    setState((prev) => ({ ...prev, yZoom: 1 }));
  }, []);

  const handleScroll = useCallback(() => {
    if (!isShiftPressed && manchetteWithSpaceTimeChartContainer.current) {
      const { scrollTop } = manchetteWithSpaceTimeChartContainer.current;
      if (scrollTop || scrollTop === 0) {
        setState((prev) => ({ ...prev, scrollPosition: scrollTop, yOffset: scrollTop }));
      }
    }
  }, [isShiftPressed, manchetteWithSpaceTimeChartContainer]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Shift') {
      setIsShiftPressed(true);
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Shift') {
      setIsShiftPressed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const toggleMode = useCallback(() => {
    setState((prev) => ({ ...prev, isProportional: !prev.isProportional }));
  }, []);

  const computedScales = useMemo(
    () => getScales(operationalPointsWithPosition, { height, isProportional, yZoom }),
    [operationalPointsWithPosition, height, isProportional, yZoom]
  );

  const manchetteProps = useMemo(
    () => ({
      waypoints: waypointWithHeight,
      zoomYIn,
      zoomYOut,
      resetZoom,
      toggleMode,
      yZoom,
      isProportional,
    }),
    [waypointWithHeight, zoomYIn, zoomYOut, resetZoom, toggleMode, yZoom, isProportional]
  );

  const handleXZoom = useCallback(
    (newXZoom: number, xPosition = (spaceTimeChartRef?.current?.offsetWidth || 0) / 2) => {
      setState((prev) => ({
        ...prev,
        ...zoomX(prev.xZoom, prev.xOffset, newXZoom, xPosition),
      }));
    },
    [spaceTimeChartRef]
  );

  const spaceTimeChartProps = useMemo(
    () => ({
      operationalPoints: operationalPointsWithPosition,
      spaceScales: computedScales,
      timeScale: zoomValueToTimeScale(xZoom),
      paths,
      xOffset,
      yOffset: -scrollPosition + 14,
      onZoom: ({ delta, position }: Parameters<NonNullable<SpaceTimeChartProps['onZoom']>>[0]) => {
        if (isShiftPressed) {
          handleXZoom(xZoom + delta, position.x);
        }
      },
      onPan: (payload: {
        initialPosition: { x: number; y: number };
        position: { x: number; y: number };
        isPanning: boolean;
      }) => {
        const diff = getDiff(payload.initialPosition, payload.position);
        const newState = { ...state };

        if (!payload.isPanning) {
          newState.panning = null;
        } else if (!panning) {
          newState.panning = { initialOffset: { x: xOffset, y: yOffset } };
        } else {
          const { initialOffset } = panning;
          newState.xOffset = initialOffset.x + diff.x;

          const newYPos = initialOffset.y - diff.y;
          if (
            manchetteWithSpaceTimeChartContainer.current &&
            newYPos >= 0 &&
            newYPos + INITIAL_SPACE_TIME_CHART_HEIGHT <=
              manchetteWithSpaceTimeChartContainer.current.scrollHeight
          ) {
            newState.yOffset = newYPos;
            newState.scrollPosition = newYPos;
            manchetteWithSpaceTimeChartContainer.current.scrollTop = newYPos;
          }
        }
        setState(newState);
      },
    }),
    [
      operationalPointsWithPosition,
      computedScales,
      xZoom,
      paths,
      xOffset,
      scrollPosition,
      isShiftPressed,
      state,
      panning,
      yOffset,
      manchetteWithSpaceTimeChartContainer,
      handleXZoom,
    ]
  );

  return useMemo(
    () => ({
      manchetteProps,
      spaceTimeChartProps,
      handleScroll,
      handleXZoom,
      xZoom,
    }),
    [manchetteProps, spaceTimeChartProps, handleScroll, handleXZoom, xZoom]
  );
};

export default useManchettesWithSpaceTimeChart;
