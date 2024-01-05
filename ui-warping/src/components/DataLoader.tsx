import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
import { featureCollection } from '@turf/helpers';
import { BBox2d } from '@turf/helpers/dist/js/lib/geojson';
import { Feature, FeatureCollection } from 'geojson';
import { uniqBy } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactMapGL, { Layer, LayerProps, MapRef, Source } from 'react-map-gl/maplibre';

import { simplifyFeature } from '../core/helpers';
import { SourceDefinition } from '../core/types.ts';

const TIME_LABEL = 'Loading data around warped path';

/**
 * This component handles loading entities from MapLibre vector servers, and retrieving them as GeoJSONs from the
 * MapLibre `querySourceFeatures` method. It's quite dirty (it has to mount a map in the DOM, but somewhere it won't be
 * visible), but necessary until we get proper APIs for any sources.
 *
 * It is designed as a component instead of a hook to simplify mounting/unmounting the temporary invisible map.
 */
const DataLoader: FC<{
  bbox: BBox2d;
  mapStyle?: string | StyleSpecification;
  onDataLoaded: (sourcesData: Record<string, FeatureCollection>) => void;
  sources: SourceDefinition[];
}> = ({ bbox, mapStyle, onDataLoaded, sources }) => {
  const [mapRef, setMapRef] = useState<MapRef | null>(null);
  const [state, setState] = useState<'idle' | 'render' | 'loaded'>('idle');

  useEffect(() => {
    if (!mapRef) return;

    mapRef.fitBounds(bbox, { animate: false });
    setTimeout(() => {
      console.time(TIME_LABEL);
      setState('render');
    }, 0);
  }, [mapRef, bbox]);

  useEffect(() => {
    if (state === 'render') {
      const m = mapRef as MapRef;

      const querySources = () => {
        // Retrieve layers data:
        let featuresCount = 0;
        let incrementalID = 1;
        const sourcesData: Record<string, FeatureCollection> = {};
        sources.forEach(({ id: sourceId, layers }) => {
          let features: Feature[] = [];
          layers.forEach(({ id: layerId }) => {
            features = features.concat(
              m.querySourceFeatures(layerId, { sourceLayer: layerId }).map(simplifyFeature),
            );
          });
          sourcesData[sourceId] = featureCollection(
            uniqBy(features, (f) => f.id || `generated-${++incrementalID}`),
          );
          featuresCount += sourcesData[sourceId]?.features.length || 0;
        });

        console.timeEnd(TIME_LABEL);
        console.log('  - Features: ', featuresCount);

        // Finalize:
        onDataLoaded(sourcesData);
        setState('loaded');
      };

      m.on('idle', querySources);

      return () => {
        m.off('idle', querySources);
      };
    }

    return undefined;
  }, [state]);

  return state !== 'loaded'
    ? createPortal(
        <div
          className="position-absolute"
          style={{
            bottom: '110%',
            height: 1200,
            width: 1200,
          }}
        >
          <ReactMapGL ref={setMapRef} mapStyle={mapStyle} style={{ width: '100%', height: '100%' }}>
            {state === 'render' &&
              sources.map(({ id, url, layers }) => (
                <Source key={id} id={id} type="vector" url={url}>
                  {layers.map(({ id: layerId, ...layerProps }) => (
                    <Layer key={layerId} id={layerId} {...(layerProps as LayerProps)} />
                  ))}
                </Source>
              ))}
          </ReactMapGL>
        </div>,
        document.body,
      )
    : null;
};

export default DataLoader;
