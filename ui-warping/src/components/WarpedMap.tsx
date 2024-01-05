/* eslint-disable no-console */
import bbox from '@turf/bbox';
import { BBox2d } from '@turf/helpers/dist/js/lib/geojson';
import { Feature, FeatureCollection, LineString } from 'geojson';
import { isNil, mapValues, omitBy } from 'lodash';
import { ComponentType, FC, useEffect, useState } from 'react';
import { LineLayer } from 'react-map-gl/maplibre';

import getWarping, { WarpingFunction } from '../core/getWarping';
import { SourceDefinition } from '../core/types.ts';
import DataLoader from './DataLoader';
import TransformedDataMap from './TransformedDataMap';

const TIME_LABEL = 'Warping OSRD and OSM data';
const WIDTH = 300;

interface PathStatePayload {
  path: Feature<LineString>;
  pathBBox: BBox2d;
  warpedBBox: BBox2d;
  transform: WarpingFunction;
}

type Components = Record<'loader', ComponentType>;
const DEFAULT_COMPONENTS: Components = {
  loader: () => 'Loading...',
};

/**
 * This component handles loading all data along a given path on various sources, and then displays them on a map (using
 * TransformedDataMap):
 */
const WarpedMap: FC<{
  path: Feature<LineString>;
  pathLayer?: Omit<LineLayer, 'source-layer'>;
  sources: SourceDefinition[];
  components?: Partial<Components>;
}> = ({ path, pathLayer, sources, components: partialComponents = {} }) => {
  const [state, setState] = useState<
    | { type: 'idle' }
    | { type: 'loading' }
    | { type: 'error'; message?: string }
    | ({
        type: 'pathLoaded';
      } & PathStatePayload)
    | ({
        type: 'dataLoaded';
      } & PathStatePayload & { transformedData: Record<string, FeatureCollection> })
  >({ type: 'idle' });
  const components: Components = {
    ...DEFAULT_COMPONENTS,
    ...partialComponents,
  };

  /**
   * This effect handles reading the path, and retrieve the warping function:
   */
  useEffect(() => {
    const pathBBox = bbox(path) as BBox2d;
    const { warpedBBox, transform } = getWarping(path);

    setState({ type: 'pathLoaded', path, pathBBox, warpedBBox, transform });
  }, [path]);

  return (
    <div
      className="warped-map position-relative d-flex flex-row"
      style={{ width: WIDTH, overflow: 'hidden', transition: '0.2s' }}
    >
      {state.type === 'pathLoaded' && (
        <DataLoader
          bbox={state.pathBBox}
          sources={sources}
          onDataLoaded={(data) => {
            console.time(TIME_LABEL);
            const transformedData = omitBy(
              mapValues(data, (collection) => (collection ? state.transform(collection) : null)),
              isNil,
            ) as typeof data;
            console.timeEnd(TIME_LABEL);
            setState({ ...state, transformedData, type: 'dataLoaded' });
          }}
        />
      )}
      {state.type !== 'dataLoaded' && <components.loader />}
      {state.type === 'dataLoaded' && (
        <div
          className="bg-white border m-3"
          style={{
            width: WIDTH,
            borderRadius: 4,
            marginRight: '0.5rem',
          }}
        >
          <TransformedDataMap
            bbox={state.warpedBBox}
            sources={sources}
            transformedData={state.transformedData}
            path={path}
            pathLayer={pathLayer}
          />
        </div>
      )}
    </div>
  );
};

export default WarpedMap;
