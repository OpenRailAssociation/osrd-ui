export type ElectricalPofilelValues = {
  electricalProfile: string;
  color?: string;
  heightLevel?: number;
  handled?: boolean;
};

export type PowerRestrictionValues = {
  powerRestriction: string;
  handled: boolean;
};

export type SpeedLimitTagValues = {
  tag: string;
  color: string;
};

export type ElectrificationValues = {
  type: 'electrification' | 'neutral_section' | 'non_electrified';
  voltage?: '1500V' | '25000V';
  lowerPantograph?: boolean;
};

// TODO: Stop using this type and use ValuesAlongPath instead.
export type LayerData<T> = {
  position: {
    start: number;
    end?: number;
  };
  value: T;
};

export type ValuesAlongPath<T> = {
  // The n boundaries of the values along the path.
  // Ignore first and last values which are 0 and the total length of the path.
  boundaries: number[];
  // The n+1 values along the path. Each value is associated with a range of the path.
  // A value at index i is associated with the path between boundaries[i-1] bounradaires[i].
  values: T[];
};

export type SpeedLimit = {
  // The speed limit in km/h.
  speed: number;
  // Is the speed limit temporary or permanent.
  isTemporary: boolean;
};

export type Data = {
  speeds: LayerData<number>[];
  ecoSpeeds: LayerData<number>[];
  stops: LayerData<string>[];
  electrifications: LayerData<ElectrificationValues>[];
  slopes: LayerData<number>[];
  mrsp?: ValuesAlongPath<SpeedLimit>;
  electricalProfiles?: LayerData<ElectricalPofilelValues>[];
  powerRestrictions?: LayerData<PowerRestrictionValues>[];
  speedLimitTags?: LayerData<SpeedLimitTagValues>[];
  // The length of the train in meters.
  trainLength: number;
};

export type Store = Data & {
  ratioX: number;
  leftOffset: number;
  cursor: {
    x: number | null;
    y: number | null;
  };
  detailsBoxDisplay: {
    energySource: boolean;
    tractionStatus: boolean;
    declivities: boolean;
    electricalProfiles: boolean;
    powerRestrictions: boolean;
  };
  layersDisplay: {
    steps: boolean;
    declivities: boolean;
    speedLimits: boolean;
    electricalProfiles: boolean;
    powerRestrictions: boolean;
    speedLimitTags: boolean;
  };
  isSettingsPanelOpened: boolean;
};

export type DrawFunctionParams = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  store: Store;
  setStore?: React.Dispatch<React.SetStateAction<Store>>;
};

export type TrainDetails = {
  curveX: number;
  curveY: number;
  speedText: string;
  ecoSpeedText: string;
  effortText: string;
  electricalModeText: string;
  electricalProfileText: string;
  powerRestrictionText: string;
  previousGradientText: number;
  modeText: string;
};

export type tooltipInfos = {
  cursorX: number;
  cursorY: number;
  text: string;
};

export type ColorDictionary = {
  [key: string]: string;
};
