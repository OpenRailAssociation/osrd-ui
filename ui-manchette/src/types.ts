import { type CSSProperties } from 'react';

export type Waypoint = {
  id: string;
  position: number; // in mm
  name?: string;
  secondaryCode?: string;
};

export type InteractiveWaypoint = Waypoint & {
  styles?: CSSProperties;
  display?: boolean;
  onClick?: (opId: string, opRef: HTMLDivElement | null) => void;
};

export type ProjectPathTrainResult = {
  id: number;
  name: string;
  spaceTimeCurves: {
    positions: number[]; // in mm
    times: number[]; // in seconds since the departure of the train
  }[];
  departureTime: Date;
};
