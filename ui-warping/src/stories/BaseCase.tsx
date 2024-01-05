import { lineString } from '@turf/helpers';
import { FC } from 'react';
import { LineLayer } from 'react-map-gl/maplibre';

import BaseMap from '../components/BaseMap';
import WarpedMap from '../components/WarpedMap';
import { SourceDefinition } from '../core/types.ts';

const SOURCES: SourceDefinition[] = [];

const PATH = lineString([]);

const PATH_LAYER: Omit<LineLayer, 'source-layer'> = {
  id: 'path-layer',
  source: 'path',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': 'blue',
  },
};

const BaseCase: FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
      <div style={{ padding: '1em' }}>
        <BaseMap path={PATH} pathLayer={PATH_LAYER} sources={SOURCES} />
      </div>
      <div style={{ padding: '1em' }}>
        <WarpedMap path={PATH} pathLayer={PATH_LAYER} sources={SOURCES} />
      </div>
    </div>
  );
};

export default BaseCase;
