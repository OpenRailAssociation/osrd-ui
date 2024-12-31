import {
  type DrawingFunction,
  type LayerType,
} from '@osrd-project/ui-spacetimechart/src/lib/types';

import { type TICKS_PATTERN } from './consts';

export type Track = {
  id: string;
  name: string;
  line: string;
};

export type OccupancyZone = {
  id: string;
  trackId: string;
  arrivalTrainName: string;
  departureTrainName: string;
  color: string;
  originStation?: string;
  destinationStation?: string;
  arrivalTime: Date;
  departureTime: Date;
};

export type TrackOccupancyCanvasProps = {
  opId: string;
  useDraw: (layer: LayerType, fn: DrawingFunction) => void;
  setCanvasesRoot: (root: HTMLDivElement | null) => void;
  selectedTrainId: string;
  setSelectedTrainId: (id: string) => void;
  mousePosition: { x: number; y: number };
};

export type TrackOccupancyManchetteProps = {
  tracks: Track[];
};

export type TickPattern = keyof typeof TICKS_PATTERN;
