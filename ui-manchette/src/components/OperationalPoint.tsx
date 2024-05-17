import React from 'react';
import { OperationalPointType } from '../types/pathPropertiesTypes';
import '@osrd-project/ui-core/dist/theme.css';

const OperationalPoint: React.FC<OperationalPointType> = ({ extensions, id, part, position }) => {
  const positionKm = () => {
    return Math.round((position / 1000000) * 10) / 10;
  };
  return (
    <div className="flex op items-baseline" id={id}>
      <div className="op-position justify-self-start text-end">{positionKm()}</div>

      <div className="op-name mr-2 ml-2 justify-self-start">{extensions?.identifier?.name}</div>
      <div className="op-separator"></div>
      <div className="op-ch font-mono justify-self-end">{extensions?.sncf?.ch}</div>
      <div className="op-separator"></div>

      <div className="op-type"></div>
      <div className="op-separator"></div>
      {/* <div className="lines"></div> */}
    </div>
  );
};

export default OperationalPoint;
