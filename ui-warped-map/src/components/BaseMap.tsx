import React, { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
import bbox from '@turf/bbox';
import { featureCollection } from '@turf/helpers';
import { BBox2d } from '@turf/helpers/dist/js/lib/geojson';
import { Feature, LineString } from 'geojson';
import ReactMapGL, { Layer, LayerProps, MapRef, Source } from 'react-map-gl/maplibre';

import { SourceDefinition } from '../core/types';

/**
 * This component is for testing purpose only. It displays data as they appear in the DataLoader component.
 */
const BaseMap: FC<
  PropsWithChildren<{
    path: Feature<LineString>;
    sources: SourceDefinition[];
    mapStyle?: string | StyleSpecification;
  }>
> = ({ path, mapStyle, sources, children }) => {
  const [mapRef, setMapRef] = useState<MapRef | null>(null);
  const interactiveLayerIds = useMemo(
    () => sources.flatMap(({ layers }) => layers.map(({ id }) => id)),
    [sources]
  );

  // This effect handles the map initial position:
  useEffect(() => {
    if (!mapRef || !path) return;

    setTimeout(() => {
      mapRef.fitBounds(bbox(path) as BBox2d, { animate: false });
      mapRef.resize();
    }, 0);
  }, [mapRef]);

  return (
    <ReactMapGL
      ref={setMapRef}
      mapStyle={mapStyle}
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={interactiveLayerIds}
      onClick={({ features }) => {
        if (features?.length)
          console.log(
            'Click base map',
            !features?.length
              ? null
              : features.length === 1
                ? features[0]
                : featureCollection(features)
          );
      }}
    >
      <Layer type="background" paint={{ 'background-color': 'white' }} />
      {sources.map(({ id, url, layers }) => (
        <Source key={id} id={id} type="vector" url={url}>
          {layers.map(({ id: layerId, ...layerProps }) => (
            <Layer key={layerId} id={layerId} {...(layerProps as LayerProps)} />
          ))}
        </Source>
      ))}
      {children}
    </ReactMapGL>
  );
};

export default BaseMap;
