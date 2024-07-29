import React, { type FC, useMemo } from 'react';

import { featureCollection } from '@turf/helpers';
import { type Feature, type LineString } from 'geojson';
import { Layer, type LineLayer, Source } from 'react-map-gl/maplibre';

import { OSM_BASE_MAP_STYLE, OSM_SOURCE } from './helpers';
import BaseMap from '../components/BaseMap';
import Loader from '../components/Loader';
import WarpedMap from '../components/WarpedMap';
import getWarping, { type WarpingOptions } from '../core/getWarping';
import { type SourceDefinition } from '../core/types';
import { useAsyncMemo } from '../core/useAsyncMemo';

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

const AlgorithmsShowcase: FC<{ path: Feature<LineString>; warpingOptions: WarpingOptions }> = ({
  path,
  warpingOptions,
}) => {
  const { grid, warpedGrid } = useMemo(
    () => getWarping(path, warpingOptions),
    [path, warpingOptions]
  );
  const pathCollection = useMemo(() => featureCollection([path]), [path]);

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
          <Source type="geojson" data={grid}>
            <Layer
              id="grid-layer"
              source="grid"
              type="line"
              paint={{
                'line-width': 1,
                'line-color': 'red',
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
          warpingOptions={warpingOptions}
        >
          <Source type="geojson" data={warpedGrid}>
            <Layer
              id="grid-layer"
              source="grid"
              type="line"
              paint={{
                'line-width': 1,
                'line-color': 'red',
              }}
            />
          </Source>
        </WarpedMap>
      </div>
    </div>
  );
};

const Algorithms: FC<{ path: string } & WarpingOptions> = (props) => {
  const { path: pathName, ...warpingOptions } = props;
  const pathState = useAsyncMemo(
    () => fetch(`/${pathName}.json`).then((res) => res.json() as Promise<Feature<LineString>>),
    [pathName]
  );
  const path = pathState.type === 'ready' ? pathState.data : null;

  if (!path) return <Loader />;

  return <AlgorithmsShowcase key={pathName} path={path} warpingOptions={warpingOptions} />;
};

export default Algorithms;
