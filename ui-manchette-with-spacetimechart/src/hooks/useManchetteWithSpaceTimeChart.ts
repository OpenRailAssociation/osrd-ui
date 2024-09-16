import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
  ProjectPathTrainResult,
  OperationalPointType,
} from '@osrd-project/ui-manchette/src/types';
import type { OperationalPoint, SpaceScale } from '@osrd-project/ui-spacetimechart/dist/lib/types';

import { useIsOverflow } from './useIsOverFlow';
import usePaths from './usePaths';
import { MAX_ZOOM_Y, MIN_ZOOM_Y, ZOOM_Y_DELTA, INITIAL_SPACE_TIME_CHART_HEIGHT } from '../consts';
import {
  calcOperationalPointsToDisplay,
  computeTimeWindow,
  getOperationalPointsWithPosition,
  getScales,
  calcOperationalPointsHeight,
} from '../helpers';
import { getDiff } from '../utils/vector';

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
  manchette: React.RefObject<HTMLDivElement>,
  selectedProjection?: number,
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

  const paths = usePaths(projectPathTrainResult, selectedProjection);

  const checkOverflow = useCallback((isOverflowFromCallback: boolean) => {
    setState((prev) => ({ ...prev, panY: isOverflowFromCallback }));
  }, []);
  useIsOverflow(manchette, checkOverflow);

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
    if (!isShiftPressed && manchette.current) {
      const { scrollTop } = manchette.current;
      if (scrollTop || scrollTop === 0) {
        setState((prev) => ({ ...prev, scrollPosition: scrollTop, yOffset: scrollTop }));
      }
    }
  }, [isShiftPressed, manchette]);

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

  // Memoize the returned object to avoid unnecessary recalculations
  return useMemo(
    () => ({
      manchetteProps: {
        operationalPoints: operationalPointsWithHeight,
        zoomYIn,
        zoomYOut,
        toggleMode,
        manchetteRef: manchette,
        yZoom,
        isProportional,
      },
      spaceTimeChartProps: {
        operationalPoints: operationalPointsWithPosition,
        spaceScales: computedScales,
        timeScale: timeWindow / xZoom,
        timeWindow,
        paths,
        xZoom,
        xOffset,
        panY,
        yOffset: -scrollPosition + 14,
        scrollPosition,
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
                manchette.current &&
                newYPos >= 0 &&
                newYPos + INITIAL_SPACE_TIME_CHART_HEIGHT <= manchette.current.scrollHeight
              ) {
                newState.yOffset = newYPos;
                newState.scrollPosition = newYPos;
                manchette.current.scrollTop = newYPos;
              }
            }
          }
          setState(newState);
        },
      },
      handleScroll,
    }),
    [
      isProportional,
      operationalPointsWithHeight,
      zoomYIn,
      zoomYOut,
      toggleMode,
      handleScroll,
      manchette,
      yZoom,
      operationalPointsWithPosition,
      computedScales,
      timeWindow,
      paths,
      xZoom,
      xOffset,
      scrollPosition,
      state,
      panning,
      yOffset,
      panY,
    ]
  );
};

export default useManchettesWithSpaceTimeChart;
