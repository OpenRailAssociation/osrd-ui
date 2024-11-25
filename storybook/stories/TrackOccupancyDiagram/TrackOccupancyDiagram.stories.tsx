import React, { useMemo, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { KebabHorizontal } from '../../../ui-icons/src/index';
import TimeCaptions from '../../../ui-spacetimechart/src/components/TimeCaptions';
import { useCanvas, useDraw } from '../../../ui-spacetimechart/src/hooks/useCanvas';
import { useMouseTracking } from '../../../ui-spacetimechart/src/hooks/useMouseTracking';
import { useSize } from '../../../ui-spacetimechart/src/hooks/useSize';
import { DEFAULT_THEME } from '../../../ui-spacetimechart/src/lib/consts';
import { CanvasContext, SpaceTimeChartContext } from '../../../ui-spacetimechart/src/lib/context';
import {
  type SpaceTimeChartContextType,
  type PickingElement,
  type SpaceTimeChartTheme,
} from '../../../ui-spacetimechart/src/lib/types';
import { OPERATIONAL_POINTS } from '../../../ui-spacetimechart/src/stories/lib/paths';
import {
  getTimeToPixel,
  getSpaceToPixel,
  getDataToPoint,
  getPixelToTime,
  getPixelToSpace,
  getPointToData,
  spaceScalesToBinaryTree,
} from '../../../ui-spacetimechart/src/utils/scales';
import {
  TrackOccupancyManchette,
  TrackOccupancyCanvas,
} from '../../../ui-trackoccupancydiagram/src/index';
import occupancyZones from '../samples/TrackOccupancyDiagramSamples/occupancyZones';
import tracks from '../samples/TrackOccupancyDiagramSamples/tracks';

type TrackOccupancyDiagramProps = {
  xZoomLevel: number;
  yZoomLevel: number;
  xOffset: number;
  yOffset: number;
  spaceScaleType: 'linear' | 'proportional';
  emptyData: boolean;
};

const X_ZOOM_LEVEL = 6;
const Y_ZOOM_LEVEL = 3;

const TrackOccupancyDiagram = ({
  xZoomLevel,
  yZoomLevel,
  xOffset,
  yOffset,
  spaceScaleType,
  emptyData,
}: TrackOccupancyDiagramProps) => {
  const spaceOrigin = 0;
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const { width, height } = useSize(root);
  const [canvasesRoot, setCanvasesRoot] = useState<HTMLDivElement | null>(null);
  const { width: trackOccupancyWidth, height: trackOccupancyHeight } = useSize(canvasesRoot);
  const timeOrigin = +new Date('2024/04/02');
  const timeScale = 60000 / xZoomLevel;
  const swapAxis = undefined;
  const hideGrid = undefined;
  const hidePathsLabels = undefined;
  const enableSnapping = undefined;
  const showTicks = true;
  const fullTheme: SpaceTimeChartTheme = {
    ...DEFAULT_THEME,
    background: 'transparent',
    timeGraduationsStyles: {
      ...DEFAULT_THEME.timeGraduationsStyles,
      1: { ...DEFAULT_THEME.timeGraduationsStyles[1], color: 'transparent' },
    },
  };
  const operationalPoints = useMemo(() => (emptyData ? [] : OPERATIONAL_POINTS), [emptyData]);
  const spaceScales = useMemo(() => {
    if (emptyData) {
      return [];
    }

    return operationalPoints.slice(0, -1).map((point, i) => ({
      from: point.position,
      to: operationalPoints[i + 1].position,
      ...(spaceScaleType === 'linear'
        ? { size: 50 * yZoomLevel }
        : { coefficient: 150 / yZoomLevel }),
    }));
  }, [emptyData, operationalPoints, spaceScaleType, yZoomLevel]);

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
        showTicks,
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
      showTicks,
    ]
  );

  // TODO: when occupancyZones layer and zoom/pan are implemented, clean all unneeded variables from contextState, variables declared before contextState, and props. If needed, create a new context type.
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
    const getSpacePixel = getSpaceToPixel(spacePixelOffset, spaceScaleTree);
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
      trackOccupancyHeight,
      trackOccupancyWidth,
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
      tracks,
      occupancyZones,
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
      showTicks: !!showTicks,
      theme: fullTheme,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  const [spaceTicksRoot, setSpaceTicksRoot] = useState<HTMLDivElement | null>(null);
  const mouseState = useMouseTracking(root);
  const { position } = mouseState;
  const { canvasContext } = useCanvas(canvasesRoot, contextState, position);
  const { canvasContext: spaceTicksContext } = useCanvas(spaceTicksRoot, contextState, position);

  return (
    <div
      className="bg-ambientB-10"
      style={{
        height: 680,
        width: 1920,
        padding: '30px 40px',
      }}
    >
      <SpaceTimeChartContext.Provider value={contextState}>
        <div
          style={{
            width: 1424,
            boxShadow:
              '0px 2px 4px 0 rgba(0, 0, 0, 0.22), 0 4px 7px -3px rgba(255, 171, 88, 0.17), inset 0 1px 0 0 rgb(255, 255, 255)',
            borderRadius: 10,
          }}
        >
          <div
            className="bg-ambientB-5 flex flex-col justify-center"
            style={{
              height: 40,
              width: '100%',
              paddingLeft: 16,
              borderRadius: '10px 10px 0 0',
              boxShadow: 'inset 0 1px 0 0 rgb(255, 255, 255), inset 0 -1px 0 0 rgba(0, 0, 0, 0.25)',
            }}
          >
            <KebabHorizontal />
          </div>
          <div className="flex">
            <div
              style={{
                width: 200,
                borderRadius: '0 0 0 10px',
              }}
            >
              <TrackOccupancyManchette tracks={tracks} />
            </div>
            <CanvasContext.Provider value={canvasContext}>
              <div
                style={{
                  width: 1224,
                  borderRadius: '0 0 10px 0',
                  position: 'relative',
                }}
              >
                <TrackOccupancyCanvas useDraw={useDraw} setCanvasesRoot={setCanvasesRoot} />
              </div>
            </CanvasContext.Provider>
          </div>
        </div>
        <CanvasContext.Provider value={spaceTicksContext}>
          <div
            ref={setRoot}
            className="relative"
            style={{ marginLeft: 200, width: 1224, height: 33 }}
          >
            <div ref={setSpaceTicksRoot} className="absolute inset-0">
              <TimeCaptions />
            </div>
          </div>
        </CanvasContext.Provider>
      </SpaceTimeChartContext.Provider>
    </div>
  );
};

const meta: Meta<typeof TrackOccupancyDiagram> = {
  title: 'TrackOccupancyDiagram/Rendering',
  component: TrackOccupancyDiagram,
  decorators: [(Story) => <Story />],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    xOffset: 0,
    yOffset: 0,
    spaceScaleType: 'linear',
    emptyData: false,
  },

  render: (args) => <TrackOccupancyDiagram {...args} />,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TrackOccupancyDiagram>;

export const TrackOccupancyDiagramStoryDefault: Story = {
  args: {},
};
