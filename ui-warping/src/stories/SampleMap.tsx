import { featureCollection } from '@turf/helpers';
import { Feature, LineString } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FC, useMemo } from 'react';
import { Layer, LineLayer, Source } from 'react-map-gl/maplibre';

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

const SampleMap: FC = () => {
  const pathState = useAsyncMemo(
    () => fetch('/nantes-marseille.json').then((res) => res.json() as Promise<Feature<LineString>>),
    [],
  );
  const path = getAsyncMemoData(pathState);
  const pathCollection = useMemo(() => featureCollection(path ? [path] : []), [path]);

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

export default SampleMap;
