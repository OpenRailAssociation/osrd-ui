import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
import bbox from '@turf/bbox';
import { featureCollection } from '@turf/helpers';
import { BBox2d } from '@turf/helpers/dist/js/lib/geojson';
import { Feature, LineString } from 'geojson';
import { omit } from 'lodash';
import { FC, useEffect, useMemo, useState } from 'react';
import ReactMapGL, { Layer, LayerProps, LineLayer, MapRef, Source } from 'react-map-gl/maplibre';

import { SourceDefinition } from '../core/types.ts';

/**
 * This component is for testing purpose only. It displays data as they appear in the DataLoader component.
 */
const BaseMap: FC<{
  path: Feature<LineString>;
  pathLayer?: Omit<LineLayer, 'source-layer'>;
  sources: SourceDefinition[];
  mapStyle?: string | StyleSpecification;
}> = ({ path, pathLayer, mapStyle, sources }) => {
  const [mapRef, setMapRef] = useState<MapRef | null>(null);
  const pathCollection = useMemo(() => featureCollection([path]), [path]);

  // This effect handles the map initial position:
  useEffect(() => {
    if (!mapRef) return;

    setTimeout(() => {
      mapRef.fitBounds(bbox(path) as BBox2d, { animate: false });
      mapRef.resize();
    }, 0);
  }, [mapRef]);

  return (
    <ReactMapGL ref={setMapRef} mapStyle={mapStyle} style={{ width: '100%', height: '100%' }}>
      <Layer type="background" paint={{ 'background-color': 'white' }} />
      {sources.map(({ id, url, layers }) => (
        <Source key={id} id={id} type="vector" url={url}>
          {layers.map(({ id: layerId, ...layerProps }) => (
            <Layer key={layerId} id={layerId} {...(layerProps as LayerProps)} />
          ))}
        </Source>
      ))}
      {pathLayer && (
        <Source type="geojson" data={pathCollection}>
          <Layer {...(omit(pathLayer, 'source-layer') as LayerProps)} />
        </Source>
      )}
    </ReactMapGL>
  );
};

export default BaseMap;
