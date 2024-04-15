import React, { FC, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import { CanvasContext, MouseContext, SpaceTimeChartContext } from '../lib/context';
import { MouseContextType, SpaceTimeChartContextType, SpaceTimeChartProps } from '../lib/types';
import {
  getDataToPoint,
  getPixelToSpace,
  getPixelToTime,
  getPointToData,
  getSpaceToPixel,
  getTimeToPixel,
  spaceScalesToBinaryTree,
} from '../utils/scales';
import TimeGraduations from './TimeGraduations';
import TimeCaptions from './TimeCaptions';
import SpaceGraduations from './SpaceGraduations';
import { useSize } from '../hooks/useSize';
import { useMouse } from '../hooks/useMouse';
import { useCanvas } from '../hooks/useCanvas';

export const SpaceTimeChart: FC<SpaceTimeChartProps> = (props: SpaceTimeChartProps) => {
  const {
    operationalPoints,
    spaceOrigin,
    spaceScales,
    timeOrigin,
    timeScale,
    xOffset = 0,
    yOffset = 0,
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

  const fingerprint = useMemo(() => {
    return JSON.stringify({
      width,
      height,
      spaceOrigin,
      spaceScales,
      timeOrigin,
      timeScale,
      xOffset,
      yOffset,
    });
  }, [width, height, spaceOrigin, spaceScales, timeOrigin, timeScale, xOffset, yOffset]);

  const contextState: SpaceTimeChartContextType = useMemo(() => {
    const spaceScaleTree = spaceScalesToBinaryTree(spaceOrigin, spaceScales);

    // Data translation helpers:
    const getX = getTimeToPixel(timeOrigin, xOffset, timeScale);
    const getY = getSpaceToPixel(spaceOrigin, yOffset, spaceScaleTree);
    const getPoint = getDataToPoint(getX, getY);
    const getTime = getPixelToTime(timeOrigin, xOffset, timeScale);
    const getSpace = getPixelToSpace(spaceOrigin, yOffset, spaceScaleTree);
    const getData = getPointToData(getTime, getSpace);

    return {
      fingerprint,
      width,
      height,
      getX,
      getY,
      getPoint,
      getTime,
      getSpace,
      getData,
      operationalPoints,
      spaceOrigin,
      spaceScaleTree,
      timeOrigin,
      timeScale,
      xOffset,
      yOffset,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  const { position, down, isHover } = useMouse(root, props, contextState.getData);
  const mouseContext = useMemo<MouseContextType>(() => {
    return {
      position,
      down,
      isHover,
      data: contextState.getData(position),
    };
  }, [position, down, isHover, contextState]);
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
