import React from 'react';
import { OperationalPointType } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmtoKm } from './helpers';

const OperationalPoint: React.FC<OperationalPointType> = ({ extensions, id, position }) => {
  return (
    <div className="flex op items-baseline" id={id}>
      <div className="op-position justify-self-start text-end">{positionMmtoKm(position)}</div>

      <div className="op-name mx-2 justify-self-start">{extensions?.identifier?.name}</div>
      <div className="op-separator"></div>
      <div className="op-ch font-mono justify-self-end">{extensions?.sncf?.ch}</div>
      <div className="op-separator"></div>

      <div className="op-type"></div>
      <div className="op-separator"></div>
    </div>
  );
};

export default OperationalPoint;
