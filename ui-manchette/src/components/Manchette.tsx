import React, { useLayoutEffect, useRef, useState } from 'react';

import { ZoomIn, ZoomOut } from '@osrd-project/ui-icons';
import cx from 'classnames';

import { INITIAL_OP_LIST_HEIGHT, MAX_ZOOM_Y, MIN_ZOOM_Y } from './consts';
import WaypointList from './WaypointList';
import type { InteractiveWaypoint, WaypointMenuData } from '../types';

type ManchetteProps = {
  waypoints: InteractiveWaypoint[];
  waypointMenuData?: WaypointMenuData;
  zoomYIn: () => void;
  zoomYOut: () => void;
  resetZoom: () => void;
  height?: number;
  yZoom?: number;
  children?: React.ReactNode;
  isProportional?: boolean;
  toggleMode: () => void;
};

const Manchette = ({
  zoomYIn,
  zoomYOut,
  resetZoom,
  yZoom = 1,
  waypoints,
  waypointMenuData,
  isProportional = true,
  toggleMode,
  children,
  height = INITIAL_OP_LIST_HEIGHT,
}: ManchetteProps) => {
  const [menuPosition, setMenuPosition] = useState<number>();
  const activeWaypointRef = useRef<HTMLDivElement>(null);

  // Allow to track the menu position after we might have scrolled in the page
  useLayoutEffect(() => {
    const manchetteWrapperPosition =
      waypointMenuData?.manchetteWrapperRef?.current?.getBoundingClientRect().top;
    const waypointPosition = activeWaypointRef?.current?.getBoundingClientRect().top;

    if (!manchetteWrapperPosition || !waypointPosition) {
      setMenuPosition(undefined);
    } else {
      setMenuPosition(waypointPosition - manchetteWrapperPosition);
    }
  }, [waypointMenuData]);

  return (
    <div className="manchette-container">
      {waypointMenuData?.menu && waypointMenuData.activeWaypointId && (
        <div className="menu-wrapper" style={{ top: menuPosition }}>
          {waypointMenuData.menu}
        </div>
      )}
      <div className="bg-white-100 border-r border-grey-30" style={{ minHeight: `${height}px` }}>
        <WaypointList
          waypoints={waypoints}
          activeWaypointId={waypointMenuData?.activeWaypointId}
          activeWaypointRef={activeWaypointRef}
        />
        {children}
      </div>
      <div className="manchette-actions">
        <div className="zoom-buttons">
          <button
            className="zoom-out"
            onClick={zoomYOut}
            disabled={yZoom <= MIN_ZOOM_Y || !!waypointMenuData?.activeWaypointId}
          >
            <ZoomOut />
          </button>
          <button
            className="zoom-in"
            onClick={zoomYIn}
            disabled={yZoom >= MAX_ZOOM_Y || !!waypointMenuData?.activeWaypointId}
          >
            <ZoomIn />
          </button>
          <button
            disabled={!!waypointMenuData?.activeWaypointId}
            className="zoom-reset"
            onClick={resetZoom}
          >
            Fit
          </button>
        </div>
        <div className="flex items-center ml-auto text-sans font-semibold">
          <button
            disabled={!!waypointMenuData?.activeWaypointId}
            className="toggle-mode"
            onClick={toggleMode}
          >
            <div className="flex flex-col items-end pr-2">
              <span className={cx({ 'text-grey-30': !isProportional })}>Km</span>

              <span className={cx({ 'text-grey-30': isProportional })}>Linéaire</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manchette;
