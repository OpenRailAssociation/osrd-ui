import React from 'react';

import { type StyledOperationalPointType } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmToKm } from './helpers';

const OperationalPoint: React.FC<StyledOperationalPointType> = ({
  extensions,
  id,
  position,
  display,
}) => {
  if (!display) return null;

  return (
    <div className="flex op items-baseline" id={id}>
      <div className="op-position justify-self-start text-end">{positionMmToKm(position)}</div>

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
