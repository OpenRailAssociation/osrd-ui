import React, { type FC, useEffect, useMemo, useState } from 'react';

import cx from 'classnames';

import SpaceGraduations from './SpaceGraduations';
import TimeCaptions from './TimeCaptions';
import TimeGraduations from './TimeGraduations';
import { useCanvas } from '../hooks/useCanvas';
import { useMouse } from '../hooks/useMouse';
import { useSize } from '../hooks/useSize';
import { CanvasContext, MouseContext, SpaceTimeChartContext } from '../lib/context';
import {
  type MouseContextType,
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

export const SpaceTimeChart: FC<SpaceTimeChartProps> = (props: SpaceTimeChartProps) => {
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
      }),
    [width, height, spaceOrigin, spaceScales, timeOrigin, timeScale, xOffset, yOffset, swapAxis]
  );

  const contextState: SpaceTimeChartContextType = useMemo(() => {
    const spaceScaleTree = spaceScalesToBinaryTree(spaceOrigin, spaceScales);

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
    const getPoint = getDataToPoint(getTimePixel, getSpacePixel);
    const getTime = getPixelToTime(timeOrigin, timePixelOffset, timeScale);
    const getSpace = getPixelToSpace(spaceOrigin, spacePixelOffset, spaceScaleTree);
    const getData = getPointToData(getTime, getSpace);

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
      operationalPoints,
      spaceOrigin,
      spaceScaleTree,
      timeOrigin,
      timeScale,
      timePixelOffset,
      spacePixelOffset,
      timeAxis: !swapAxis ? 'x' : 'y',
      spaceAxis: !swapAxis ? 'y' : 'x',
      swapAxis: !!swapAxis,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  const { position, down, isHover } = useMouse(root, props, contextState.getData);
  const mouseContext = useMemo<MouseContextType>(
    () => ({
      position,
      down,
      isHover,
      data: contextState.getData(position),
    }),
    [position, down, isHover, contextState]
  );
  const { canvasContext, hoveredItem } = useCanvas(canvasesRoot, contextState, position);

  // Handle onHoveredChildUpdate:
  useEffect(() => {
    if (onHoveredChildUpdate) {
      onHoveredChildUpdate({ item: hoveredItem });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredItem]);

  return (
    <div {...attr} ref={setRoot} className={cx('relative space-time-chart', attr.className)}>
      <div ref={setCanvasesRoot} className="absolute inset-0" />
      <SpaceTimeChartContext.Provider value={contextState}>
        <CanvasContext.Provider value={canvasContext}>
          <MouseContext.Provider value={mouseContext}>
            <SpaceGraduations />
            <TimeGraduations />
            <TimeCaptions />
            {children}
          </MouseContext.Provider>
        </CanvasContext.Provider>
      </SpaceTimeChartContext.Provider>
    </div>
  );
};
