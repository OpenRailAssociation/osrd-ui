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
