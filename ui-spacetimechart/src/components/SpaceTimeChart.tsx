import React, { useEffect, useMemo, useState } from 'react';

import cx from 'classnames';

import SpaceGraduations from './SpaceGraduations';
import TimeCaptions from './TimeCaptions';
import TimeGraduations from './TimeGraduations';
import { useCanvas } from '../hooks/useCanvas';
import { useMouseInteractions } from '../hooks/useMouseInteractions';
import { useMouseTracking } from '../hooks/useMouseTracking';
import { useSize } from '../hooks/useSize';
import { DEFAULT_THEME } from '../lib/consts';
import { CanvasContext, MouseContext, SpaceTimeChartContext } from '../lib/context';
import { validateTheme } from '../lib/theme';
import {
  type MouseContextType,
  type PickingElement,
  type SpaceTimeChartContextType,
  type SpaceTimeChartProps,
} from '../lib/types';
import {
  getDataToPoint,
  getPixelToSpace,
  getPixelToTime,
  getPointToData,
  getSpaceToPixel,
  getTimeToPixel,
  spaceScalesToBinaryTree,
} from '../utils/scales';
import { snapPosition } from '../utils/snapping';

export const SpaceTimeChart = (props: SpaceTimeChartProps) => {
  const {
    operationalPoints,
    spaceOrigin,
    spaceScales,
    timeOrigin,
    timeScale,
    xOffset = 0,
    yOffset = 0,
    swapAxis,
    onHoveredChildUpdate,
    children,
    enableSnapping,
    hideGrid,
    hidePathsLabels,
    theme,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    onPan,
    onZoom,
    onClick,
    onMouseMove,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...attr
  } = props;

  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [canvasesRoot, setCanvasesRoot] = useState<HTMLDivElement | null>(null);
  const fullTheme = useMemo(() => ({ ...DEFAULT_THEME, ...theme }), [theme]);
  const { width, height } = useSize(root);

  const fingerprint = useMemo(
    () =>
      JSON.stringify({
        width,
        height,
        spaceOrigin,
        spaceScales,
        timeOrigin,
        timeScale,
        xOffset,
        yOffset,
        swapAxis,
        hideGrid,
        hidePathsLabels,
      }),
    [
      width,
      height,
      spaceOrigin,
      spaceScales,
      timeOrigin,
      timeScale,
      xOffset,
      yOffset,
      swapAxis,
      hideGrid,
      hidePathsLabels,
    ]
  );

  const contextState: SpaceTimeChartContextType = useMemo(() => {
    const spaceScaleTree = spaceScalesToBinaryTree(spaceOrigin, spaceScales);
    const timeAxis = !swapAxis ? 'x' : 'y';
    const spaceAxis = !swapAxis ? 'y' : 'x';

    // Data translation helpers:
    let timePixelOffset;
    let spacePixelOffset;

    if (!swapAxis) {
      timePixelOffset = xOffset;
      spacePixelOffset = yOffset;
    } else {
      timePixelOffset = yOffset;
      spacePixelOffset = xOffset;
    }

    const getTimePixel = getTimeToPixel(timeOrigin, timePixelOffset, timeScale);
    const getSpacePixel = getSpaceToPixel(spaceOrigin, spacePixelOffset, spaceScaleTree);
    const getPoint = getDataToPoint(getTimePixel, getSpacePixel, timeAxis, spaceAxis);
    const getTime = getPixelToTime(timeOrigin, timePixelOffset, timeScale);
    const getSpace = getPixelToSpace(spaceOrigin, spacePixelOffset, spaceScaleTree);
    const getData = getPointToData(getTime, getSpace, timeAxis, spaceAxis);

    const pickingElements: PickingElement[] = [];
    const resetPickingElements = () => {
      pickingElements.length = 0;
    };
    const registerPickingElement = (element: PickingElement) => {
      pickingElements.push(element);
      return pickingElements.length - 1;
    };

    return {
      fingerprint,
      width,
      height,
      getTimePixel,
      getSpacePixel,
      getPoint,
      getTime,
      getSpace,
      getData,
      pickingElements,
      resetPickingElements,
      registerPickingElement,
      operationalPoints,
      spaceOrigin,
      spaceScaleTree,
      timeOrigin,
      timeScale,
      timePixelOffset,
      spacePixelOffset,
      timeAxis,
      spaceAxis,
      swapAxis: !!swapAxis,
      enableSnapping: !!enableSnapping,
      hideGrid: !!hideGrid,
      hidePathsLabels: !!hidePathsLabels,
      theme: fullTheme,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  const mouseState = useMouseTracking(root);
  const { position, down, isHover } = mouseState;
  const { canvasContext, hoveredItem } = useCanvas(canvasesRoot, contextState, position);

  const mouseContext = useMemo<MouseContextType>(() => {
    const snappedPosition = enableSnapping
      ? snapPosition(mouseState.position, hoveredItem)
      : mouseState.position;

    return {
      down,
      isHover,
      position: snappedPosition,
      hoveredItem: hoveredItem,
      data: contextState.getData(snappedPosition),
    };
  }, [enableSnapping, mouseState.position, hoveredItem, down, isHover, contextState]);

  // Handle interactions:
  useMouseInteractions(root, mouseContext, { onPan, onZoom, onClick, onMouseMove }, contextState);

  // Handle onHoveredChildUpdate:
  useEffect(() => {
    if (onHoveredChildUpdate) {
      onHoveredChildUpdate({ item: hoveredItem, context: contextState });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredItem]);

  // Check theme validity:
  useEffect(() => {
    validateTheme(fullTheme);
  }, [fullTheme]);

  return (
    <div
      {...attr}
      ref={setRoot}
      className={cx('relative space-time-chart', attr.className)}
      style={{ background: fullTheme.background }}
    >
      <div ref={setCanvasesRoot} className="absolute inset-0" />
      <SpaceTimeChartContext.Provider value={contextState}>
        <CanvasContext.Provider value={canvasContext}>
          <MouseContext.Provider value={mouseContext}>
            {!hideGrid && (
              <>
                <SpaceGraduations />
                <TimeGraduations />
                <TimeCaptions />
              </>
            )}
            {children}
          </MouseContext.Provider>
        </CanvasContext.Provider>
      </SpaceTimeChartContext.Provider>
    </div>
  );
};
