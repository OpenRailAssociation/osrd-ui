import { featureCollection } from '@turf/helpers';
import { Feature, LineString } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { FC, useMemo } from 'react';
import { Layer, LineLayer, Source } from 'react-map-gl/maplibre';

import BaseMap from '../components/BaseMap';
import Loader from '../components/Loader';
import WarpedMap from '../components/WarpedMap';
import { SourceDefinition } from '../core/types';
import { useAsyncMemo } from '../core/useAsyncMemo';
import { OSM_BASE_MAP_STYLE, OSM_SOURCE } from './helpers';

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

const SampleMap: FC<{ path: string }> = ({ path: pathName }) => {
  const pathState = useAsyncMemo(
    () => fetch(`/${pathName}.json`).then((res) => res.json() as Promise<Feature<LineString>>),
    [pathName]
  );
  const path = pathState.type === 'ready' ? pathState.data : null;
  const pathCollection = useMemo(() => featureCollection(path ? [path] : []), [path]);

  if (!path) return <Loader />;

  return (
    <div
      key={pathName}
      style={{
        background: 'lightgrey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'absolute',
        inset: 0,
      }}
    >
      <div style={{ marginRight: '1em', flexGrow: 1 }}>
        <BaseMap path={path} sources={SOURCES} mapStyle={OSM_BASE_MAP_STYLE}>
          <Source type="geojson" data={pathCollection}>
            <Layer
              id="path-layer"
              source="path"
              type="line"
              paint={{
                'line-width': 1,
                'line-color': 'blue',
              }}
            />
          </Source>
        </BaseMap>
      </div>
      <div style={{ flexGrow: 1 }}>
        <WarpedMap
          log
          path={path}
          pathLayer={PATH_LAYER}
          sources={SOURCES}
          mapStyle={OSM_BASE_MAP_STYLE}
        />
      </div>
    </div>
  );
};

export default SampleMap;
