import React, { useLayoutEffect, useRef, useState } from 'react';

import { INITIAL_OP_LIST_HEIGHT } from './consts';
import WaypointList from './WaypointList';
import type { InteractiveWaypoint, WaypointMenuData } from '../types';

type SplitManchetteWithDivProps = {
  waypoints: InteractiveWaypoint[];
  splitPosition: number[];
  splitHeight: number;
  waypointMenuData?: WaypointMenuData;
  height?: number;
  children?: React.ReactNode;
};

const SplitManchetteWithDiv = ({
  splitPosition,
  splitHeight,
  waypoints,
  waypointMenuData,
  children,
  height = INITIAL_OP_LIST_HEIGHT,
}: SplitManchetteWithDivProps) => {
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
          splitPosition={splitPosition}
          splitHeight={splitHeight}
        />
        {children}
      </div>
    </div>
  );
};

export default SplitManchetteWithDiv;
