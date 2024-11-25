import {
  type DrawingFunction,
  type LayerType,
} from '@osrd-project/ui-spacetimechart/src/lib/types';

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
  useDraw: (layer: LayerType, fn: DrawingFunction) => void;
  setCanvasesRoot: (root: HTMLDivElement | null) => void;
};

export type TrackOccupancyManchetteProps = {
  tracks: Track[];
};

export type Store = {
  tracks: Track[];
  zones: OccupancyZone[];
  selectedTrain: string | null;
  timeOrigin: number; // in ms
  timeScale: number; // in ms/px
  ratio: number;
  offsetX: number;
  clientX: number;
  clientY: number;
};

export type DrawFunctionParams = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  store: Store;
  setStore?: React.Dispatch<React.SetStateAction<Store>>;
};
