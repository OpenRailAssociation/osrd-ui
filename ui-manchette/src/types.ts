import { type CSSProperties } from 'react';

export type PathProperties = {
  operational_points?:
    | {
        extensions?: OperationalPointExtensions;
        id: string;
        part: OperationalPointPart;
        /** Distance from the beginning of the path in mm */
        position: number;
      }[]
    | null;
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
  onClick?: (opId: string) => void;
};

export type WaypointMenuData = {
  activeOperationalPointId?: string;
  waypointMenuItems?: WaypointMenuItem[];
  waypointMenuClassName?: string;
};

export type WaypointMenuItem = {
  title: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
};

export type ProjectPathTrainResult = {
  /*Name of train */
  name: string;
  /*Id of train */
  id: number;
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
