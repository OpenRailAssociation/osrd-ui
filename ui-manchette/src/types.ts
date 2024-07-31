import { type CSSProperties } from 'react';

export type PathProperties = {
  electrifications?: {
    /** List of `n` boundaries of the ranges.
          A boundary is a distance from the beginning of the path in mm. */
    boundaries: number[];
    /** List of `n+1` values associated to the ranges */
    values: (
      | {
          type: 'electrification';
          voltage: string;
        }
      | {
          lower_pantograph: boolean;
          type: 'neutral_section';
        }
      | {
          type: 'non_electrified';
        }
    )[];
  } | null;
  geometry?: GeoJsonLineString | null;
  gradients?: {
    /** List of `n` boundaries of the ranges.
          A boundary is a distance from the beginning of the path in mm. */
    boundaries: number[];
    /** List of `n+1` values associated to the ranges */
    values: number[];
  } | null;
  /** Operational points along the path */
  operational_points?:
    | {
        extensions?: OperationalPointExtensions;
        id: string;
        part: OperationalPointPart;
        /** Distance from the beginning of the path in mm */
        position: number;
      }[]
    | null;
  slopes?: {
    /** List of `n` boundaries of the ranges.
          A boundary is a distance from the beginning of the path in mm. */
    boundaries: number[];
    /** List of `n+1` values associated to the ranges */
    values: number[];
  } | null;
};

export type GeoJsonLineString = {
  coordinates: GeoJsonLineStringValue;
  type: 'LineString';
};

export type GeoJsonPointValue = number[];
export type GeoJsonLineStringValue = GeoJsonPointValue[];

export type OperationalPointExtensions = {
  identifier?: {
    name: string;
    uic: number;
  } | null;
  sncf?: {
    ch: string;
    ch_long_label: string;
    ch_short_label: string;
    ci: number;
    trigram: string;
  } | null;
};
export type OperationalPointPart = {
  extensions?: {
    sncf?: {
      kp: string;
    } | null;
  };
  position: number;
  track: string;
};

export type ArrayElement<ArrayType extends readonly unknown[] | null | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type OperationalPointType = ArrayElement<PathProperties['operational_points'] | null>;

export type StyledOperationalPointType = OperationalPointType & {
  styles?: CSSProperties;
  display?: boolean;
};

export type ProjectPathTrainResult = {
  /*Name of train */
  name: string;
  /*Id of train */
  id: number;
  /** List of signal updates along the path */
  signal_updates: {
    /** The labels of the new aspect */
    aspect_label: string;
    /** Whether the signal is blinking */
    blinking: boolean;
    /** The color of the aspect
        (Bits 24-31 are alpha, 16-23 are red, 8-15 are green, 0-7 are blue) */
    color: number;
    /** The route ends at this position in mm on the train path */
    position_end: number;
    /** The route starts at this position in mm on the train path */
    position_start: number;
    /** The id of the updated signal */
    signal_id: string;
    /** The aspects stop being displayed at this time (number of seconds since `departure_time`) */
    time_end: number;
    /** The aspects start being displayed at this time (number of mseconds since `departure_time`) */
    time_start: number;
  }[];
  /** List of space-time curves sections along the path */
  space_time_curves: {
    positions: number[];
    times: number[];
  }[];
  /** Departure time of the train */
  departure_time: string;
  /** Rolling stock length in mm */
  rolling_stock_length: number;
};

export type SpaceTimeCurves = ArrayElement<ProjectPathTrainResult['space_time_curves'] | null>;
