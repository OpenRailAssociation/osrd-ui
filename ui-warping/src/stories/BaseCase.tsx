import { Feature, LineString } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FC } from 'react';
import { LineLayer } from 'react-map-gl/maplibre';

import BaseMap from '../components/BaseMap';
import Loader from '../components/Loader.tsx';
import WarpedMap from '../components/WarpedMap';
import { OSM_BASE_MAP_STYLE, OSM_SOURCE } from '../core/osm.ts';
import { SourceDefinition } from '../core/types.ts';
import { getAsyncMemoData, useAsyncMemo } from '../core/useAsyncMemo.ts';

const SOURCES: SourceDefinition[] = [OSM_SOURCE];

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
  const pathState = useAsyncMemo(
    () => fetch('/nantes-angers.json').then((res) => res.json() as Promise<Feature<LineString>>),
    [],
  );
  const path = getAsyncMemoData(pathState);

  if (!path) return <Loader />;

  return (
    <div
      style={{
        background: 'lightgrey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'absolute',
        inset: 0,
      }}
    >
      <div style={{ margin: '1em', flexGrow: 1, background: 'lightgrey' }}>
        <BaseMap
          path={path}
          pathLayer={PATH_LAYER}
          sources={SOURCES}
          mapStyle={OSM_BASE_MAP_STYLE}
        />
      </div>
      <div style={{ margin: '1em', flexGrow: 1, background: 'lightgrey' }}>
        <WarpedMap
          path={path}
          pathLayer={PATH_LAYER}
          sources={SOURCES}
          mapStyle={OSM_BASE_MAP_STYLE}
        />
      </div>
    </div>
  );
};

export default BaseCase;
