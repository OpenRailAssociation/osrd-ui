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
  tracks: Track[];
  zones: OccupancyZone[];
  selectedTrain: string | null;
  timeOrigin: number; // in ms
  timeScale: number; // in ms/px
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
