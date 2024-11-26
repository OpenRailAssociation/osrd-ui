import React from 'react';

import { ZoomIn, ZoomOut } from '@osrd-project/ui-icons';
import cx from 'classnames';

import { INITIAL_OP_LIST_HEIGHT, MAX_ZOOM_Y, MIN_ZOOM_Y } from './consts';
import WaypointList from './WaypointList';
import type { InteractiveWaypoint } from '../types';

type ManchetteProps = {
  waypoints: InteractiveWaypoint[];
  activeWaypointId?: string;
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
  activeWaypointId,
  isProportional = true,
  toggleMode,
  children,
  height = INITIAL_OP_LIST_HEIGHT,
}: ManchetteProps) => (
  <div className="manchette-container">
    <div className="bg-white-100 border-r border-grey-30" style={{ height: `${height}px` }}>
      <WaypointList waypoints={waypoints} activeWaypointId={activeWaypointId} />
      {children}
    </div>
    <div className="manchette-actions">
      <div className="zoom-buttons">
        <button className="zoom-out" onClick={zoomYOut} disabled={yZoom <= MIN_ZOOM_Y}>
          <ZoomOut />
        </button>
        <button className="zoom-in" onClick={zoomYIn} disabled={yZoom >= MAX_ZOOM_Y}>
          <ZoomIn />
        </button>
        <button className="zoom-reset" onClick={resetZoom}>
          Fit
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
);

export default Manchette;
