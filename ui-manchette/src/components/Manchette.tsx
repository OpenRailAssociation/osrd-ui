import React from 'react';
import OperationalPointList from './OperationalPointList';
import { OperationalPointType } from '../types';
import { ZoomIn, ZoomOut } from '@osrd-project/ui-icons';

type ManchetteProps = {
  operationalPoints: OperationalPointType[];
  children?: React.ReactNode;
  isProportionnal?: boolean;
};

const Manchette: React.FC<ManchetteProps> = ({
  operationalPoints,
  children,
  isProportionnal = false,
}) => {
  const [zoom, setZoom] = React.useState(1);

  const zoomIn = () => {
    if (zoom < 10) setZoom(zoom + 0.5);
  };

  const zoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.5);
  };

  return (
    <div className="manchette flex">
      <div className="manchette-container">
        <OperationalPointList
          operationalPoints={operationalPoints}
          zoom={zoom}
          isProportionnal={isProportionnal}
        />
        <div className="manchette-actions flex items-center">
          <div className=" flex items-center ">
            <button className="h-full px-3 w-full" onClick={zoomOut} disabled={zoom === 1}>
              <ZoomOut />
            </button>
          </div>
          <div className=" flex items-center  border-x border-black-25  h-full">
            <button className="h-full px-3 w-full" onClick={zoomIn}>
              <ZoomIn />
            </button>
          </div>
        </div>
      </div>
      <div className="space-time-chart">{children}</div>
    </div>
  );
};

export default Manchette;
