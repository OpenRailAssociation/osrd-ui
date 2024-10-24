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
  onClick?: (waypointId: string) => void;
};

export type WaypointMenuData = {
  menu: React.ReactNode;
  activeWaypointId?: string;
  manchetteWrapperRef: React.RefObject<HTMLDivElement>;
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
