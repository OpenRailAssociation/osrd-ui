import React, { useLayoutEffect, useRef, useState } from 'react';

import cx from 'classnames';

import useElementInView from '../hooks/useElementInView';
import { type InteractiveWaypoint } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmToKm } from '../utils';

const MANCHETTE_ACTIONS_HEIGHT = '-40px';
// Waypoint height minus its position offset
const MENU_OFFSET = 2;

type WaypointProps = {
  waypoint: InteractiveWaypoint;
  isActive: boolean;
  waypointMenu?: React.ReactNode;
  scrollableParentRef?: React.RefObject<HTMLElement>;
};

const Waypoint = ({
  waypoint: { name, secondaryCode, id, position, display, onClick },
  isActive,
  waypointMenu,
  scrollableParentRef,
}: WaypointProps) => {
  const waypointRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPositionTop, setMenuPositionTop] = useState(0);

  const isWaypointInView = useElementInView(
    isActive ? waypointRef : undefined,
    scrollableParentRef,
    {
      threshold: 1,
      rootMargin: `0px 0px ${MANCHETTE_ACTIONS_HEIGHT} 0px`,
    }
  );

  // We have to omit the dependency array here otherwise the menu won't move on scroll
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    // Having the waypoint div in position relative has the side effect of making the menu
    // not overflowing the waypoint list. So we need to position it with this logic.
    if (waypointRef.current) {
      const { bottom } = waypointRef.current?.getBoundingClientRect();
      setMenuPositionTop(bottom - MENU_OFFSET);
    }
  });

  if (!display) return null;

  return (
    <>
      <div
        ref={waypointRef}
        className={cx('flex waypoint items-baseline', {
          'menu-active': isActive,
        })}
        id={id}
        onClick={() => {
          if (onClick) onClick(id);
        }}
      >
        <div className="waypoint-position justify-self-start text-end">
          {positionMmToKm(position)}
        </div>

        <div className="waypoint-name mx-2 justify-self-start">{name}</div>
        <div className="waypoint-separator"></div>
        <div className="waypoint-ch font-mono justify-self-end">{secondaryCode}</div>
        <div className="waypoint-separator"></div>

        <div className="waypoint-type"></div>
        <div className="waypoint-separator"></div>
        {waypointMenu && isActive && isWaypointInView && (
          <div className="menu-wrapper" ref={menuRef} style={{ top: menuPositionTop }}>
            {waypointMenu}
          </div>
        )}
      </div>
      <div className="last-separator"></div>
    </>
  );
};

export default Waypoint;
