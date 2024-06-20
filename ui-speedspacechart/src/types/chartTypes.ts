import type {
  ConsolidatedPositionSpeedTime,
  ElectrificationRange,
  GradientPosition,
  OsrdSimulationState,
  SimulationPowerRestrictionRange,
  Slope,
  Stop,
} from './simulationTypes';

export type Store = {
  speed: ConsolidatedPositionSpeedTime[];
  stops: Stop[];
  electrification: ElectrificationRange[];
  slopes: GradientPosition[] | Slope[];
  electricalProfiles?: OsrdSimulationState['electricalProfiles'];
  powerRestrictions?: SimulationPowerRestrictionRange[];
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

export type TrainDetails = {
  curveX: number;
  curveY: number;
  marecoSpeedText: string;
  effortText: string;
  electricalModeText: string;
  electricalProfileText: string;
  powerRestrictionText: string;
  previousGradientText: number;
  modeText: string;
};
