import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
  ProjectPathTrainResult,
  OperationalPointType,
} from '@osrd-project/ui-manchette/src/types';
import type {
  OperationalPoint,
  SpaceScale,
  SpaceTimeChartProps,
} from '@osrd-project/ui-spacetimechart/dist/lib/types';

import { useIsOverflow } from './useIsOverFlow';
import usePaths from './usePaths';
import { MAX_ZOOM_Y, MIN_ZOOM_Y, ZOOM_Y_DELTA, INITIAL_SPACE_TIME_CHART_HEIGHT } from '../consts';
import {
  calcOperationalPointsToDisplay,
  computeTimeWindow,
  getOperationalPointsWithPosition,
  getScales,
  calcOperationalPointsHeight,
  zoomX,
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
  operationalPointsChart: OperationalPoint[];
  panY: boolean;
  scales: SpaceScale[];
};

const useManchettesWithSpaceTimeChart = (
  operationalPoints: OperationalPointType[],
  projectPathTrainResult: ProjectPathTrainResult[],
  manchetteWithSpaceTimeChartContainer: React.RefObject<HTMLDivElement>,
  selectedTrain?: number,
  height = 561
) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [state, setState] = useState<State>({
    xZoom: 1,
    yZoom: 1,
    xOffset: 0,
    yOffset: 0,
    panning: null,
    scrollPosition: 0,
    isProportional: true,
    operationalPointsChart: [],
    panY: false,
    scales: [],
  });

  const { xZoom, yZoom, xOffset, yOffset, panY, panning, scrollPosition, isProportional } = state;

  const paths = usePaths(projectPathTrainResult, selectedTrain);

  const checkOverflow = useCallback((isOverflowFromCallback: boolean) => {
    setState((prev) => ({ ...prev, panY: isOverflowFromCallback }));
  }, []);
  useIsOverflow(manchetteWithSpaceTimeChartContainer, checkOverflow);

  // Memoize timeWindow to avoid recalculation on each render
  const timeWindow = useMemo(
    () => computeTimeWindow(projectPathTrainResult),
    [projectPathTrainResult]
  );

  // Memoize computedOperationalPoints to avoid recalculations unless the dependencies change
  const operationalPointsToDisplay = useMemo(
    () => calcOperationalPointsToDisplay(operationalPoints, { height, isProportional, yZoom }),
    [operationalPoints, height, isProportional, yZoom]
  );
  const operationalPointsWithHeight = useMemo(
    () =>
      calcOperationalPointsHeight(operationalPointsToDisplay, { height, isProportional, yZoom }),
    [operationalPointsToDisplay, height, yZoom, isProportional]
  );

  const operationalPointsWithPosition = useMemo(
    () => getOperationalPointsWithPosition(operationalPointsToDisplay),
    [operationalPointsToDisplay]
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

  // Memoize manchetteProps separately
  const manchetteProps = useMemo(
    () => ({
      operationalPoints: operationalPointsWithHeight,
      zoomYIn,
      zoomYOut,
      toggleMode,
      yZoom,
      isProportional,
    }),
    [operationalPointsWithHeight, zoomYIn, zoomYOut, toggleMode, yZoom, isProportional]
  );

  // Memoize spaceTimeChartProps separately
  const spaceTimeChartProps = useMemo(
    () => ({
      operationalPoints: operationalPointsWithPosition,
      spaceScales: computedScales,
      timeScale: timeWindow / xZoom,
      paths,
      xOffset,
      yOffset: -scrollPosition + 14,
      onZoom: (payload: Parameters<NonNullable<SpaceTimeChartProps['onZoom']>>[0]) => {
        if (isShiftPressed) {
          setState((prev) => ({
            ...prev,
            ...zoomX(prev.xZoom, prev.xOffset, payload),
          }));
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
          if (panY) {
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
        }
        setState(newState);
      },
    }),
    [
      operationalPointsWithPosition,
      computedScales,
      timeWindow,
      xZoom,
      paths,
      xOffset,
      panY,
      scrollPosition,
      isShiftPressed,
      state,
      panning,
      yOffset,
      manchetteWithSpaceTimeChartContainer,
    ]
  );

  return useMemo(
    () => ({
      manchetteProps,
      spaceTimeChartProps,
      handleScroll,
    }),
    [manchetteProps, spaceTimeChartProps, handleScroll]
  );
};

export default useManchettesWithSpaceTimeChart;
