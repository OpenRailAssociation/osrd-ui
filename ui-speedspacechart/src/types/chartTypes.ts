export type ElectricalPofilelValues = {
  electricalProfile: string;
  color?: string;
  heightLevel?: number;
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
  type: 'electrification' | 'neutral_section';
  voltage?: '1500V' | '25000V';
  lowerPantograph?: boolean;
};

export type LayerData<T> = {
  position: {
    start: number;
    end?: number;
  };
  value: T;
};

export type Data = {
  speeds: LayerData<number>[];
  ecoSpeeds: LayerData<number>[];
  stops: LayerData<string>[];
  electrifications: LayerData<ElectrificationValues>[];
  slopes: LayerData<number>[];
  electricalProfiles?: LayerData<ElectricalPofilelValues>[];
  powerRestrictions?: LayerData<PowerRestrictionValues>[];
  speedLimitTags?: LayerData<SpeedLimitTagValues>[];
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
    temporarySpeedLimits: boolean;
    electricalProfiles: boolean;
    powerRestrictions: boolean;
    speedLimitTags: boolean;
  };
  isSettingsPanelOpened: boolean;
};

export type CurveConfig = {
  minSpeed: number;
  speedRange: number;
  maxPosition: number;
  ratioX: number;
};

export type CanvasConfig = {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
};

export type DrawFunctionParams = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  store: Store;
  setStore?: React.Dispatch<React.SetStateAction<Store>>;
  isEco?: boolean;
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
