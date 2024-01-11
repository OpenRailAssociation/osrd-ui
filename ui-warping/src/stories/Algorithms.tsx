import { featureCollection } from '@turf/helpers';
import { Feature, LineString } from 'geojson';
import { FC, useMemo } from 'react';
import { Layer, LineLayer, Source } from 'react-map-gl/maplibre';

import BaseMap from '../components/BaseMap.tsx';
import Loader from '../components/Loader.tsx';
import WarpedMap from '../components/WarpedMap.tsx';
import getWarping from '../core/getWarping.ts';
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

const AlgorithmsShowcase: FC<{ path: Feature<LineString> }> = ({ path }) => {
  const { grid, warpedGrid } = useMemo(() => getWarping(path), [path]);
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
      <div style={{ margin: '1em', flexGrow: 1, background: 'lightgrey' }}>
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
      <div style={{ margin: '1em', flexGrow: 1, background: 'lightgrey' }}>
        <WarpedMap
          path={path}
          pathLayer={PATH_LAYER}
          sources={SOURCES}
          mapStyle={OSM_BASE_MAP_STYLE}
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

const Algorithms: FC = () => {
  const pathState = useAsyncMemo(
    () => fetch('/nantes-marseille.json').then((res) => res.json() as Promise<Feature<LineString>>),
    [],
  );
  const path = getAsyncMemoData(pathState);

  if (!path) return <Loader />;

  return <AlgorithmsShowcase path={path} />;
};

export default Algorithms;
