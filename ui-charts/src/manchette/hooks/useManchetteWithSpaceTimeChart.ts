import { useCallback, useEffect, useMemo, useState } from 'react';

import { clamp } from 'lodash';

import usePaths from './usePaths';
import type { SpaceScale, SpaceTimeChartProps } from '../../spaceTimeChart';
import {
  MAX_ZOOM_Y,
  MIN_ZOOM_Y,
  ZOOM_Y_DELTA,
  DEFAULT_ZOOM_MS_PER_PX,
  MAX_ZOOM_MS_PER_PX,
  MIN_ZOOM_MS_PER_PX,
  BASE_WAYPOINT_HEIGHT,
  FOOTER_HEIGHT,
  WAYPOINT_LINE_HEIGHT,
} from '../consts';
import type { ProjectPathTrainResult, Waypoint } from '../types';
import { getDistance, calcTotalDistance } from '../utils';
import {
  computeWaypointsToDisplay,
  getScales,
  zoomX,
  zoomValueToTimeScale,
  timeScaleToZoomValue,
  spaceScaleToZoomValue,
  getExtremaScales,
  zoomValueToSpaceScale,
} from '../utils/helpers';

type State = {
  xZoom: number;
  yZoom: number;
  timeOrigin: number;
  spaceOrigin: number;
  /** current x PIXEL offset from x origin */
  xOffset: number;
  /** current y PIXEL offset from y origin (the current y-scroll of the view. always updates) */
  yOffset: number;
  /** only update after a zoom. used to update back the view scroll value */
  scrollTo: number | null;
  panning: { initialOffset: { x: number; y: number } } | null;
  zoomMode: boolean;
  rect: {
    timeStart: Date;
    timeEnd: Date;
    spaceStart: number; // mm
    spaceEnd: number; // mm
  } | null;
  pixelRect: {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
  } | null;
  isProportional: boolean;
  waypointsChart: Waypoint[];
  scales: SpaceScale[];
};

const useManchetteWithSpaceTimeChart = ({
  waypoints,
  projectPathTrainResult,
  manchetteWithSpaceTimeChartRef,
  height = 561,
  spaceTimeChartRef,
  defaultTimeOrigin = 0,
  defaultSpaceOrigin = 0,
}: {
  waypoints: Waypoint[];
  projectPathTrainResult: ProjectPathTrainResult[];
  manchetteWithSpaceTimeChartRef: React.RefObject<HTMLDivElement>;
  height?: number;
  spaceTimeChartRef?: React.RefObject<HTMLDivElement>;
  defaultTimeOrigin?: number;
  defaultSpaceOrigin?: number;
}) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [state, setState] = useState<State>({
    xZoom: timeScaleToZoomValue(DEFAULT_ZOOM_MS_PER_PX),
    yZoom: 1,
    timeOrigin: defaultTimeOrigin,
    spaceOrigin: defaultSpaceOrigin,
    xOffset: 0,
    yOffset: 0,
    scrollTo: null,
    panning: null,
    zoomMode: false,
    rect: null,
    pixelRect: null,
    isProportional: true,
    waypointsChart: [],
    scales: [],
  });

  const {
    xZoom,
    yZoom,
    timeOrigin,
    spaceOrigin,
    xOffset,
    yOffset,
    scrollTo,
    panning,
    zoomMode,
    rect,
    pixelRect,
    isProportional,
  } = state;

  /** used when we change the train dataset for example to center the chart on the new data */
  const setTimeOrigin = useCallback((newTimeOrigin: number) => {
    setState((prev) => ({ ...prev, timeOrigin: newTimeOrigin }));
  }, []);

  const paths = usePaths(projectPathTrainResult);
  const canvasDrawingHeight = height - FOOTER_HEIGHT; // 521
  const drawingHeightWithoutTopPadding = canvasDrawingHeight - BASE_WAYPOINT_HEIGHT / 2; // 505
  const drawingHeightWithoutBothPadding = canvasDrawingHeight - BASE_WAYPOINT_HEIGHT; // 489
  const totalDistance = calcTotalDistance(waypoints);

  const { minZoomMillimeterPerPx, maxZoomMillimeterPerPx } = getExtremaScales(
    drawingHeightWithoutTopPadding,
    drawingHeightWithoutBothPadding,
    totalDistance
  );

  const waypointsToDisplay = useMemo(
    () =>
      computeWaypointsToDisplay(
        waypoints,
        { height, isProportional, yZoom },
        minZoomMillimeterPerPx,
        maxZoomMillimeterPerPx
      ),
    [waypoints, height, isProportional, yZoom, minZoomMillimeterPerPx, maxZoomMillimeterPerPx]
  );

  const simplifiedWaypoints = useMemo(
    () =>
      waypointsToDisplay.map((point) => ({
        id: point.id,
        label: point.id,
        position: point.position,
        importanceLevel: 1,
      })),
    [waypointsToDisplay]
  );

  const computedScales = useMemo(
    () =>
      getScales(
        simplifiedWaypoints,
        { height, isProportional, yZoom },
        minZoomMillimeterPerPx,
        maxZoomMillimeterPerPx
      ),
    [
      simplifiedWaypoints,
      height,
      isProportional,
      yZoom,
      minZoomMillimeterPerPx,
      maxZoomMillimeterPerPx,
    ]
  );

  const handleRectangleZoom = useCallback(
    ({
      scales: { chosenTimeScale, chosenSpaceScale },
      overrideState,
    }: {
      scales: { chosenTimeScale: number; chosenSpaceScale?: number };
      overrideState?: Partial<State>;
    }) => {
      setState((prev) => {
        if (prev.zoomMode || !prev.rect) {
          return prev;
        }
        const newTimeScale = clamp(chosenTimeScale, MAX_ZOOM_MS_PER_PX, MIN_ZOOM_MS_PER_PX);
        const timeZoomValue = timeScaleToZoomValue(newTimeScale);
        const leftRectSide = Math.min(Number(prev.rect.timeStart), Number(prev.rect.timeEnd));
        const newXOffset = (timeOrigin - leftRectSide) / newTimeScale;

        let newYZoom = yZoom;
        let newYOffset = yOffset;
        if (chosenSpaceScale) {
          const newSpaceScale = clamp(
            chosenSpaceScale,
            maxZoomMillimeterPerPx,
            minZoomMillimeterPerPx
          );
          newYZoom = spaceScaleToZoomValue(
            minZoomMillimeterPerPx,
            maxZoomMillimeterPerPx,
            newSpaceScale
          );
          const topRectSide = Math.min(prev.rect.spaceStart, prev.rect.spaceEnd);
          newYOffset = Math.abs(spaceOrigin - topRectSide) / newSpaceScale;
        }

        return {
          ...prev,
          xZoom: timeZoomValue,
          yZoom: newYZoom,
          xOffset: newXOffset,
          yOffset: newYOffset,
          scrollTo: newYOffset,
          ...overrideState,
        };
      });
    },
    [timeOrigin, spaceOrigin, minZoomMillimeterPerPx, maxZoomMillimeterPerPx, yOffset, yZoom]
  );

  useEffect(() => {
    if (rect && !zoomMode && spaceTimeChartRef?.current) {
      const { timeStart, timeEnd, spaceStart, spaceEnd } = rect;
      const timeRange = Math.abs(Number(timeEnd) - Number(timeStart)); // width of rect in ms
      const spaceRange = Math.abs(spaceEnd - spaceStart); // height of rect in mm

      const chosenTimeScale = timeRange / spaceTimeChartRef.current.clientWidth;
      if (isProportional) {
        const chosenSpaceScale = spaceRange / drawingHeightWithoutTopPadding;
        handleRectangleZoom({
          scales: { chosenTimeScale, chosenSpaceScale },
          overrideState: { rect: null },
        });
      } else if (pixelRect) {
        const currentStopHeight = BASE_WAYPOINT_HEIGHT * yZoom;
        const { yStart, yEnd } = pixelRect;
        const numberOfStopsInRect = Math.abs(yEnd - yStart) / currentStopHeight;
        let newStopHeight = drawingHeightWithoutTopPadding / numberOfStopsInRect;
        // at maximum zoom, we want 3 stops displayed
        const maxStopHeight =
          drawingHeightWithoutTopPadding / (2 + BASE_WAYPOINT_HEIGHT / newStopHeight);
        newStopHeight = Math.min(newStopHeight, maxStopHeight);
        const newYZoom = newStopHeight / BASE_WAYPOINT_HEIGHT;
        const rectTop = yOffset + Math.min(yStart, yEnd) - WAYPOINT_LINE_HEIGHT;
        const numberOfStopsBeforeRectTop = rectTop / currentStopHeight;
        const newYOffset = numberOfStopsBeforeRectTop * newStopHeight;

        handleRectangleZoom({
          scales: {
            chosenTimeScale,
          },
          overrideState: {
            rect: null,
            pixelRect: null,
            yZoom: newYZoom,
            yOffset: newYOffset,
            scrollTo: newYOffset,
          },
        });
      }
    }
  }, [
    state.rect,
    state.zoomMode,
    handleRectangleZoom,
    drawingHeightWithoutTopPadding,
    isProportional,
    pixelRect,
    rect,
    spaceTimeChartRef,
    yOffset,
    yZoom,
    zoomMode,
  ]);

  const zoomYIn = useCallback(() => {
    const maxZoom = isProportional
      ? MAX_ZOOM_Y
      : (drawingHeightWithoutTopPadding - BASE_WAYPOINT_HEIGHT) / (2 * BASE_WAYPOINT_HEIGHT);
    const newYZoom = Math.min(yZoom + ZOOM_Y_DELTA, maxZoom);
    if (newYZoom !== yZoom) {
      const newYOffset = yOffset * (newYZoom / yZoom);

      setState((prev) => ({
        ...prev,
        yZoom: newYZoom,
        yOffset: newYOffset,
        scrollTo: newYOffset,
      }));
    }
  }, [yZoom, yOffset, drawingHeightWithoutTopPadding, isProportional]);

  const zoomYOut = useCallback(() => {
    const newYZoom = Math.max(MIN_ZOOM_Y, yZoom - ZOOM_Y_DELTA);
    if (newYZoom !== yZoom) {
      const newYOffset = yOffset * (newYZoom / yZoom);
      setState((prev) => ({
        ...prev,
        yZoom: newYZoom,
        yOffset: newYOffset,
        scrollTo: newYOffset,
      }));
    }
  }, [yZoom, yOffset]);

  const handleXZoom = useCallback(
    (newXZoom: number, xPosition = (spaceTimeChartRef?.current?.offsetWidth || 0) / 2) => {
      setState((prev) => ({
        ...prev,
        ...zoomX(prev.xZoom, prev.xOffset, newXZoom, xPosition),
      }));
    },
    [spaceTimeChartRef]
  );

  useEffect(() => {
    if (scrollTo !== null && manchetteWithSpaceTimeChartRef.current) {
      manchetteWithSpaceTimeChartRef.current.scrollTo({
        top: scrollTo,
        behavior: 'instant',
      });
    }
  }, [scrollTo, manchetteWithSpaceTimeChartRef]);

  const resetZoom = useCallback(() => {
    setState((prev) => ({ ...prev, yZoom: 1 }));
  }, []);

  const handleScroll = useCallback(() => {
    if (!isShiftPressed && manchetteWithSpaceTimeChartRef.current) {
      const { scrollTop } = manchetteWithSpaceTimeChartRef.current;
      if (scrollTop || scrollTop === 0) {
        setState((prev) => ({ ...prev, yOffset: scrollTop }));
      }
    }
  }, [isShiftPressed, manchetteWithSpaceTimeChartRef]);

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

  const toggleZoomMode = useCallback(() => {
    setState((prev) => ({ ...prev, zoomMode: !prev.zoomMode }));
  }, []);

  const manchetteProps = useMemo(
    () => ({
      contents: waypointsToDisplay,
      zoomYIn,
      zoomYOut,
      resetZoom,
      toggleMode,
      yZoom,
      isProportional,
      yOffset,
    }),
    [waypointsToDisplay, zoomYIn, zoomYOut, resetZoom, toggleMode, yZoom, isProportional, yOffset]
  );

  const spaceTimeChartProps = useMemo(
    () => ({
      operationalPoints: simplifiedWaypoints,
      spaceScales: computedScales,
      timeScale: zoomValueToTimeScale(xZoom),
      paths,
      xOffset,
      yOffset: -yOffset + 14,
      timeOrigin,
      spaceOrigin,
      rect,
      onZoom: ({ delta, position }: Parameters<NonNullable<SpaceTimeChartProps['onZoom']>>[0]) => {
        if (isShiftPressed) {
          handleXZoom(xZoom + delta, position.x);
        }
      },
      onPan: (payload: Parameters<NonNullable<SpaceTimeChartProps['onPan']>>[0]) => {
        const {
          initialData,
          data,
          initialPosition,
          position,
          isPanning,
          context: { width, getData },
        } = payload;
        const diff = getDistance(initialPosition, position);
        setState((prev) => {
          if (!isPanning) {
            return {
              ...prev,
              panning: null,
              zoomMode: false,
            };
          }

          if (state.zoomMode) {
            const minPoint = getData({ x: 0, y: 0 });
            const maxPoint = getData({ x: width, y: canvasDrawingHeight });
            const timeStart = clamp(initialData.time, minPoint.time, maxPoint.time);
            const timeEnd = clamp(data.time, minPoint.time, maxPoint.time);
            const spaceStart = clamp(initialData.position, minPoint.position, maxPoint.position);
            const spaceEnd = clamp(data.position, minPoint.position, maxPoint.position);
            const newRect: State['rect'] = {
              timeStart: new Date(timeStart),
              timeEnd: new Date(timeEnd),
              spaceStart,
              spaceEnd,
            };

            let newPixelRect: State['pixelRect'] = null;
            if (!isProportional) {
              const xStart = clamp(initialPosition.x, 0, width);
              const xEnd = clamp(position.x, 0, width);
              const yStart = clamp(initialPosition.y, 0, canvasDrawingHeight);
              const yEnd = clamp(position.y, 0, canvasDrawingHeight);
              newPixelRect = { xStart, xEnd, yStart, yEnd };
            }

            return {
              ...prev,
              rect: newRect,
              pixelRect: newPixelRect,
            };
          }

          if (!panning) {
            return {
              ...prev,
              panning: { initialOffset: { x: xOffset, y: yOffset } },
            };
          }

          const newState = { ...prev };
          const { initialOffset } = panning;
          newState.xOffset = initialOffset.x + diff.x;

          const newYPos = initialOffset.y - diff.y;
          if (
            manchetteWithSpaceTimeChartRef.current &&
            newYPos >= 0 &&
            newYPos + manchetteWithSpaceTimeChartRef.current.offsetHeight <
              manchetteWithSpaceTimeChartRef.current.scrollHeight
          ) {
            newState.yOffset = newYPos;
            manchetteWithSpaceTimeChartRef.current.scrollTop = newYPos;
          }
          return newState;
        });
      },
    }),
    [
      simplifiedWaypoints,
      computedScales,
      xZoom,
      paths,
      xOffset,
      isShiftPressed,
      state,
      panning,
      yOffset,
      manchetteWithSpaceTimeChartRef,
      handleXZoom,
      isProportional,
      rect,
      spaceOrigin,
      timeOrigin,
      canvasDrawingHeight,
    ]
  );

  const timeScale = useMemo(() => zoomValueToTimeScale(xZoom), [xZoom]);
  const spaceScale = useMemo(
    () => zoomValueToSpaceScale(minZoomMillimeterPerPx, maxZoomMillimeterPerPx, yZoom),
    [yZoom, minZoomMillimeterPerPx, maxZoomMillimeterPerPx]
  );
  return useMemo(
    () => ({
      manchetteProps,
      spaceTimeChartProps,
      handleScroll,
      handleXZoom,
      xZoom,
      toggleZoomMode,
      zoomMode,
      rect,
      timeScale,
      spaceScale,
      setTimeOrigin,
    }),
    [
      manchetteProps,
      spaceTimeChartProps,
      handleScroll,
      handleXZoom,
      xZoom,
      zoomMode,
      rect,
      spaceScale,
      timeScale,
      toggleZoomMode,
      setTimeOrigin,
    ]
  );
};

export default useManchetteWithSpaceTimeChart;
