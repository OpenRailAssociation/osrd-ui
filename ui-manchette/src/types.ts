import { type CSSProperties } from 'react';

export type Waypoint = {
  id: string;
  position: number; // in mm
  name?: string;
  secondaryCode?: string;
};

export type EnrichedWaypoint = Waypoint & {
  styles?: CSSProperties;
  display?: boolean;
  onClick?: (opId: string, opRef: HTMLDivElement | null) => void;
};

export type ProjectPathTrainResult = {
  id: number;
  name: string;
  space_time_curves: {
    positions: number[];
    times: number[];
  }[];
};
