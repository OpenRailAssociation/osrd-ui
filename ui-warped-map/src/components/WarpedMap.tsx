import React, { ComponentType, FC, PropsWithChildren, useEffect, useState } from "react";
import { StyleSpecification } from "@maplibre/maplibre-gl-style-spec";
import bbox from "@turf/bbox";
import { BBox2d } from "@turf/helpers/dist/js/lib/geojson";
import { Feature, FeatureCollection, LineString } from "geojson";
import { isNil, mapValues, omitBy } from "lodash";
import { LineLayer } from "react-map-gl/maplibre";

import getWarping, { WarpingFunction, WarpingOptions } from "../core/getWarping";
import { SourceDefinition } from "../core/types";
import DataLoader from "./DataLoader";
import Loader from "./Loader";
import TransformedDataMap from "./TransformedDataMap";

const TIME_LABEL = "Warping data";

interface PathStatePayload {
  path: Feature<LineString>;
  warpedPath: Feature<LineString>;
  pathBBox: BBox2d;
  warpedPathBBox: BBox2d;
  transform: WarpingFunction;
}

type Components = Record<"loader", ComponentType>;
const DEFAULT_COMPONENTS: Components = {
  loader: Loader,
};

/**
 * This component handles loading all data along a given path on various sources, and then displays them on a map (using
 * TransformedDataMap):
 */
const WarpedMap: FC<
  PropsWithChildren<{
    path: Feature<LineString>;
    pathLayer?: Omit<LineLayer, "source-layer">;
    sources: SourceDefinition[];
    components?: Partial<Components>;
    mapStyle?: string | StyleSpecification;
    warpingOptions?: WarpingOptions;
    log?: boolean;
  }>
> = ({ path, pathLayer, sources, components: partialComponents = {}, mapStyle, warpingOptions, log, children }) => {
  const [state, setState] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "error"; message?: string }
    | ({
        type: "pathLoaded";
      } & PathStatePayload)
    | ({
        type: "dataLoaded";
      } & PathStatePayload & {
          data: Record<string, FeatureCollection>;
          transformedData: Record<string, FeatureCollection>;
        })
  >({ type: "idle" });
  const components: Components = {
    ...DEFAULT_COMPONENTS,
    ...partialComponents,
  };

  /**
   * This effect handles reading the path, and retrieve the warping function:
   */
  useEffect(() => {
    const pathBBox = bbox(path) as BBox2d;
    const { warpedPathBBox, transform } = getWarping(path, warpingOptions);
    const warpedPath = transform(path) as typeof path;

    setState({ type: "pathLoaded", path, warpedPath, pathBBox, warpedPathBBox, transform });
  }, [path, warpingOptions]);

  return (
    <>
      {state.type === "pathLoaded" && (
        <DataLoader
          log={log}
          mapStyle={mapStyle}
          bbox={state.pathBBox}
          sources={sources}
          timeout={3000}
          onDataLoaded={(data) => {
            if (log) console.time(TIME_LABEL);
            const transformedData = omitBy(
              mapValues(data, (collection) => (collection ? state.transform(collection) : null)),
              isNil,
            ) as typeof data;
            if (log) console.timeEnd(TIME_LABEL);
            setState({ ...state, data, transformedData, type: "dataLoaded" });
          }}
        />
      )}
      {state.type !== "dataLoaded" && <components.loader />}
      {state.type === "dataLoaded" && (
        <TransformedDataMap
          log={log}
          mapStyle={mapStyle}
          bbox={state.warpedPathBBox}
          sources={sources}
          transformedData={state.transformedData}
          path={state.warpedPath}
          pathLayer={pathLayer}
        >
          {children}
        </TransformedDataMap>
      )}
    </>
  );
};

export default WarpedMap;
