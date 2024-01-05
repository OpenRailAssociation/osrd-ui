import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
import { featureCollection } from '@turf/helpers';
import { BBox2d } from '@turf/helpers/dist/js/lib/geojson';
import { Feature, FeatureCollection, LineString } from 'geojson';
import { omit } from 'lodash';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import ReactMapGL, { Layer, LayerProps, LineLayer, MapRef, Source } from "react-map-gl/maplibre";

import { SourceDefinition } from '../core/types.ts';

/**
 * This component handles displaying warped data. The data must be warped before being given to this component.
 * Check `SimulationWarpedMap` to see an example use case.
 */
const TransformedDataMap: FC<
  PropsWithChildren<{
    bbox: BBox2d;
    mapStyle?: string | StyleSpecification;
    backgroundColor?: string;
    sources: SourceDefinition[];
    transformedData: Record<string, FeatureCollection>;
    path?: Feature<LineString>;
    pathLayer?: Omit<LineLayer, 'source-layer'>;
  }>
> = ({
  bbox,
  mapStyle,
  sources,
  transformedData,
  backgroundColor = 'white',
  path,
  pathLayer,
  children,
}) => {
  const [mapRef, setMapRef] = useState<MapRef | null>(null);
  const pathCollection = useMemo(() => featureCollection(path ? [path] : []), [path]);

  // This effect handles the map initial position:
  useEffect(() => {
    if (!mapRef) return;

    const avgLon = (bbox[0] + bbox[2]) / 2;
    const thinBBox: BBox2d = [avgLon, bbox[1], avgLon, bbox[3]];
    setTimeout(() => {
      mapRef.fitBounds(thinBBox, { animate: false });
      mapRef.resize();
    }, 0);
  }, [mapRef, bbox]);

  return (
    <ReactMapGL
      ref={setMapRef}
      dragPan
      doubleClickZoom
      scrollZoom
      interactive
      mapStyle={mapStyle}
      style={{ width: '100%', height: '100%' }}
    >
      <Layer type="background" paint={{ 'background-color': backgroundColor }} />
      {children}
      {sources.map((source) => (
        <Source
          key={source.id}
          id={source.id}
          type="geojson"
          data={transformedData[source.id] || featureCollection([])}
        >
          {source.layers.map((layer) => (
            <Layer key={layer.id} {...(omit(layer, 'source-layer', 'id') as LayerProps)} />
          ))}
        </Source>
      ))}
      {path && pathLayer && (
        <Source type="geojson" data={pathCollection}>
          <Layer {...(omit(pathLayer, 'source-layer') as LayerProps)} />
        </Source>
      )}
    </ReactMapGL>
  );
};

export default TransformedDataMap;
