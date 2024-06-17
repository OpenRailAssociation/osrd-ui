import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import OperationalPointList from './OperationalPointList';
import type {
  OperationalPointType,
  ProjectPathTrainResult,
  StyledOperationalPointType,
} from '../types';
import { ZoomIn, ZoomOut } from '@osrd-project/ui-icons';
import { SpaceTimeChart, PathLayer } from '@osrd-project/ui-spacetimechart';
import {
  calcOperationalPointsToDisplay,
  getOperationalPointsWithPosition,
  getScales,
  operationalPointsHeight,
} from './helpers';
import type { OperationalPoint, SpaceScale } from '@osrd-project/ui-spacetimechart/dist/lib/types';
import { INITIAL_OP_LIST_HEIGHT, INITIAL_SPACE_TIME_CHART_HEIGHT } from './consts';
import { getDiff } from '../utils/vector';
import { useIsOverflow } from '../hooks/useIsOverFlow';
type ManchetteProps = {
  operationalPoints: OperationalPointType[];
  projectPathTrainResult: ProjectPathTrainResult[];
};
import usePaths from '../hooks/usePaths';

const Manchette: React.FC<ManchetteProps> = ({ operationalPoints, projectPathTrainResult }) => {
  const manchette = useRef<HTMLDivElement>(null);

  const [zoomY, setZoomY] = useState(1);

  const xZoomLevel = 1;

  const [xOffset, setXOffset] = useState(0);

  const [yOffset, setYOffset] = useState(0);
  const [panning, setPanning] = useState<{ initialOffset: { x: number; y: number } } | null>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [operationalPointsToDisplay, setOperationalPointsToDisplay] = useState<
    StyledOperationalPointType[]
  >([]);

  const [operationalPointsChart, setOperationalPointsChart] = useState<OperationalPoint[]>([]);
  const [isProportionnal, setIsProportionnal] = useState<boolean>(false);

  const [panY, setPanY] = useState<boolean>(false);

  const [scales, setScales] = useState<SpaceScale[]>([]);

  useIsOverflow(manchette, (isOverflowFromCallback) => {
    setPanY(isOverflowFromCallback);
  });

  const paths = usePaths(projectPathTrainResult);

  const zoomYIn = () => {
    if (zoomY < 10.5) setZoomY(zoomY + 0.5);
  };

  const zoomYOut = () => {
    if (zoomY > 1) setZoomY(zoomY - 0.5);
  };
  const handleScroll = () => {
    if (manchette.current) {
      const { scrollTop } = manchette.current;
      if (scrollTop || scrollTop === 0) {
        setScrollPosition(scrollTop);
        setYOffset(scrollTop);
      }
    }
  };

  const toggleMode = () => {
    setIsProportionnal(!isProportionnal);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const computedOperationalPoints = calcOperationalPointsToDisplay(
      operationalPoints,
      isProportionnal,
      zoomY
    );

    setOperationalPointsToDisplay(
      operationalPointsHeight(computedOperationalPoints, zoomY, isProportionnal)
    );
    setOperationalPointsChart(getOperationalPointsWithPosition(computedOperationalPoints));
  }, [operationalPoints, isProportionnal, zoomY]);

  useEffect(() => {
    setScales(getScales(operationalPointsChart, isProportionnal, zoomY));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationalPointsChart]);

  return (
    <div className="manchette-space-time-chart-wrapper">
      <div
        className="header bg-ambientB-5 w-full border-b border-grey-30"
        style={{ height: '40px' }}
      ></div>
      <div ref={manchette} className="manchette flex" onScroll={handleScroll}>
        <div className="manchette-container ">
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
                disabled={zoomY === 1}
              >
                <ZoomOut />
              </button>
            </div>
            <div className=" flex items-center  border-x border-black-25  h-full">
              <button
                className="h-full px-3 w-full zoom-in"
                disabled={zoomY === 10}
                onClick={zoomYIn}
              >
                <ZoomIn />
              </button>
            </div>
            <div className="flex items-center ml-auto text-sans font-semibold">
              <button className="toggle-mode" onClick={toggleMode}>
                <div className="flex flex-col items-end pr-2">
                  <span className={cx({ 'text-grey-30': !isProportionnal })}>Km</span>

                  <span className={cx({ 'text-grey-30': isProportionnal })}>Linéaire</span>
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
              timeScale={60000 / xZoomLevel}
              xOffset={xOffset}
              yOffset={-scrollPosition + 14}
              onPan={({ initialPosition, position, isPanning }) => {
                const diff = getDiff(initialPosition, position);
                if (!isPanning) {
                  setPanning(null);
                } else if (!panning) {
                  setPanning({ initialOffset: { x: xOffset, y: yOffset } });
                } else {
                  const { initialOffset } = panning;
                  setXOffset(initialOffset.x + diff.x);
                  if (panY) {
                    const newYPos = initialOffset.y - diff.y;

                    if (
                      manchette.current &&
                      newYPos >= 0 &&
                      newYPos + INITIAL_SPACE_TIME_CHART_HEIGHT <= manchette.current?.scrollHeight
                    ) {
                      setYOffset(newYPos);
                      setScrollPosition(yOffset);
                      if (manchette.current && manchette.current.scrollHeight) {
                        manchette.current.scrollTop = newYPos;
                      }
                    }
                  }
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
