import React from 'react';

import { ZoomIn, ZoomOut } from '@osrd-project/ui-icons';
import cx from 'classnames';

import { INITIAL_OP_LIST_HEIGHT, MAX_ZOOM_Y, MIN_ZOOM_Y } from './consts';
import OperationalPointList from './OperationalPointList';
import type { StyledOperationalPointType } from '../types';

type ManchetteProps = {
  operationalPoints: StyledOperationalPointType[];
  activeOperationalPointId?: string;
  zoomYIn: () => void;
  zoomYOut: () => void;
  height?: number;
  yZoom?: number;
  children?: React.ReactNode;
  isProportional?: boolean;
  toggleMode: () => void;
};

const Manchette = ({
  zoomYIn,
  zoomYOut,
  yZoom = 1,
  operationalPoints,
  activeOperationalPointId,
  isProportional = true,
  toggleMode,
  children,
}: ManchetteProps) => (
  <div className="manchette-container">
    <div
      className=" bg-ambientB-10 border-r border-grey-30"
      style={{ minHeight: `${INITIAL_OP_LIST_HEIGHT}px` }}
    >
      <OperationalPointList
        operationalPoints={operationalPoints}
        activeOperationalPointId={activeOperationalPointId}
      />
      {children}
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
);

export default Manchette;
