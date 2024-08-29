import React, { type FC, useCallback, useEffect, useRef, useState, useMemo } from 'react';

import { ZoomIn, ZoomOut } from '@osrd-project/ui-icons';
import { SpaceTimeChart, PathLayer } from '@osrd-project/ui-spacetimechart';
import type { OperationalPoint, SpaceScale } from '@osrd-project/ui-spacetimechart/dist/lib/types';
import cx from 'classnames';

import {
  INITIAL_OP_LIST_HEIGHT,
  INITIAL_SPACE_TIME_CHART_HEIGHT,
  MAX_ZOOM_Y,
  MIN_ZOOM_Y,
  ZOOM_Y_DELTA,
} from './consts';
import {
  calcOperationalPointsToDisplay,
  computeTimeWindow,
  getOperationalPointsWithPosition,
  getScales,
  operationalPointsHeight,
  zoomX,
} from './helpers';
import OperationalPointList from './OperationalPointList';
import { useIsOverflow } from '../hooks/useIsOverFlow';
import usePaths from '../hooks/usePaths';
import type {
  OperationalPointType,
  ProjectPathTrainResult,
  StyledOperationalPointType,
} from '../types';
import { getDiff } from '../utils/vector';

const DEFAULT_HEIGHT = 561;

type ManchetteProps = {
  operationalPoints: OperationalPointType[];
  projectPathTrainResult: ProjectPathTrainResult[];
  selectedProjection?: number;
  height?: number;
};

const Manchette: FC<ManchetteProps> = ({
  operationalPoints,
  projectPathTrainResult,
  selectedProjection,
  height = DEFAULT_HEIGHT,
}) => {
  const manchette = useRef<HTMLDivElement>(null);

  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const [state, setState] = useState<{
    xZoom: number;
    yZoom: number;
    xOffset: number;
    yOffset: number;
    panY: boolean;
    panning: { initialOffset: { x: number; y: number } } | null;
    scrollPosition: number;
    isProportional: boolean;
    operationalPointsChart: OperationalPoint[];
    operationalPointsToDisplay: StyledOperationalPointType[];
    scales: SpaceScale[];
  }>({
    xZoom: 1,
    yZoom: 1,
    xOffset: 0,
    yOffset: 0,
    panning: null,
    scrollPosition: 0,
    isProportional: true,
    operationalPointsChart: [],
    operationalPointsToDisplay: [],
    panY: false,
    scales: [],
  });
  const {
    xZoom,
    yZoom,
    xOffset,
    yOffset,
    panY,
    panning,
    scrollPosition,
    isProportional,
    operationalPointsChart,
    operationalPointsToDisplay,
    scales,
  } = state;

  const paths = usePaths(projectPathTrainResult, selectedProjection);

  const timeWindow = useMemo(
    () => computeTimeWindow(projectPathTrainResult),
    [projectPathTrainResult]
  );

  const zoomYIn = useCallback(() => {
    if (yZoom < MAX_ZOOM_Y) setState((prev) => ({ ...prev, yZoom: yZoom + ZOOM_Y_DELTA }));
  }, [yZoom]);

  const zoomYOut = useCallback(() => {
    if (yZoom > MIN_ZOOM_Y) setState((prev) => ({ ...prev, yZoom: yZoom - ZOOM_Y_DELTA }));
  }, [yZoom]);

  const handleScroll = useCallback(() => {
    if (!isShiftPressed && manchette.current) {
      const { scrollTop } = manchette.current;
      if (scrollTop || scrollTop === 0) {
        setState((prev) => ({ ...prev, scrollPosition: scrollTop, yOffset: scrollTop }));
      }
    }
  }, [isShiftPressed]);

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

  const toggleMode = useCallback(() => {
    setState((prev) => ({ ...prev, isProportional: !prev.isProportional }));
  }, []);

  const checkOverflow = useCallback((isOverflowFromCallback: boolean) => {
    setState((prev) => ({ ...prev, panY: isOverflowFromCallback }));
  }, []);

  useIsOverflow(manchette, checkOverflow);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const computedOperationalPoints = calcOperationalPointsToDisplay(
      operationalPoints,
      height,
      isProportional,
      yZoom
    );

    setState((prev) => ({
      ...prev,
      operationalPointsChart: getOperationalPointsWithPosition(computedOperationalPoints),
      operationalPointsToDisplay: operationalPointsHeight(
        computedOperationalPoints,
        height,
        yZoom,
        isProportional
      ),
    }));
  }, [operationalPoints, isProportional, yZoom, height]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      scales: getScales(operationalPointsChart, height, isProportional, yZoom),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationalPointsChart, isProportional, height]);

  return (
    <div className="manchette-space-time-chart-wrapper">
      <div
        className="header bg-ambientB-5 w-full border-b border-grey-30"
        style={{ height: '40px' }}
      ></div>
      <div
        ref={manchette}
        className="manchette flex"
        style={{ height: `${height}px` }}
        onScroll={handleScroll}
      >
        <div className="manchette-container">
          <div
            className=" bg-ambientB-10 border-r border-grey-30"
            style={{ minHeight: `${INITIAL_OP_LIST_HEIGHT}px` }}
          >
            <OperationalPointList operationalPoints={operationalPointsToDisplay} />
          </div>
          <div className="manchette-actions flex items-center">
            <div className=" flex items-center ">
              <button
                className="h-full px-3 w-full zoom-out"
                onClick={zoomYOut}
                disabled={yZoom <= MIN_ZOOM_Y}
              >
                <ZoomOut />
              </button>
            </div>
            <div className=" flex items-center  border-x border-black-25  h-full">
              <button
                className="h-full px-3 w-full zoom-in"
                disabled={yZoom >= MAX_ZOOM_Y}
                onClick={zoomYIn}
              >
                <ZoomIn />
              </button>
            </div>
            <div className="flex items-center ml-auto text-sans font-semibold">
              <button className="toggle-mode" onClick={toggleMode}>
                <div className="flex flex-col items-end pr-2">
                  <span className={cx({ 'text-grey-30': !isProportional })}>Km</span>

                  <span className={cx({ 'text-grey-30': isProportional })}>Linéaire</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div
          className="space-time-chart-container w-full sticky"
          style={{ bottom: 0, left: 0, top: 0, height: `${INITIAL_SPACE_TIME_CHART_HEIGHT}px` }}
        >
          {scales.length > 0 && (
            <SpaceTimeChart
              className="inset-0 absolute h-full"
              style={{ top: 0, height: 'calc(100% - 6px)' }}
              operationalPoints={operationalPointsChart}
              spaceOrigin={0}
              spaceScales={scales}
              timeOrigin={Math.min(
                ...projectPathTrainResult.map((p) => +new Date(p.departure_time))
              )}
              timeScale={timeWindow / xZoom}
              xOffset={xOffset}
              yOffset={-scrollPosition + 14}
              onPan={({ initialPosition, position, isPanning }) => {
                const diff = getDiff(initialPosition, position);
                const newState = { ...state };

                if (!isPanning) {
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
                      newYPos + INITIAL_SPACE_TIME_CHART_HEIGHT <= manchette.current?.scrollHeight
                    ) {
                      newState.yOffset = newYPos;
                      newState.scrollPosition = newYPos;
                      if (manchette.current && manchette.current.scrollHeight) {
                        manchette.current.scrollTop = newYPos;
                      }
                    }
                  }
                }

                setState(newState);
              }}
              onZoom={(payload) => {
                if (isShiftPressed) {
                  setState((prev) => ({
                    ...prev,
                    ...zoomX(state.xZoom, state.xOffset, payload),
                  }));
                }
              }}
            >
              {paths.map((path, i) => (
                <PathLayer key={path.id} index={i} path={path} color={path.color} />
              ))}
            </SpaceTimeChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manchette;
