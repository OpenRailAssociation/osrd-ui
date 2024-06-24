import { LIST_VALUES, SIGNAL_BASE_DEFAULT } from '../stories/assets/simulationConsts';

// * types from osrd/front/src/modules/simulationResult/consts.ts

export type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type ValueOf<T> = T[keyof T];

export type ListValues = ValueOf<typeof LIST_VALUES>;

export type AllListValues = ArrayElement<ListValues>;

// * types from  osrd/front/src/common/api/osrdEditoastApi.ts

export type TrainScheduleValidation = 'NewerRollingStock' | 'NewerInfra';

export type ScheduledPoint = {
  path_offset: number;
  time: number;
};

export type RjsPowerRestrictionRange = {
  begin_position: number;
  end_position: number;
  power_restriction_code: string;
};

export type TrainScheduleOptions = {
  ignore_electrical_profiles?: boolean | null;
};

export type RollingStockComfortType = 'STANDARD' | 'AC' | 'HEATING';

export type AllowanceValue =
  | {
      minutes: number;
      value_type: 'time_per_distance';
    }
  | {
      seconds: number;
      value_type: 'time';
    }
  | {
      percentage: number;
      value_type: 'percentage';
    };

export type RangeAllowance = {
  begin_position: number;
  end_position: number;
  value: AllowanceValue;
};

export type AllowanceDistribution = 'MARECO' | 'LINEAR';

export type EngineeringAllowance = RangeAllowance & {
  capacity_speed_limit?: number;
  distribution: AllowanceDistribution;
};
export type StandardAllowance = {
  capacity_speed_limit?: number;
  default_value: AllowanceValue;
  distribution: AllowanceDistribution;
  ranges: RangeAllowance[];
};

export type Allowance =
  | (EngineeringAllowance & {
      allowance_type: 'engineering';
    })
  | (StandardAllowance & {
      allowance_type: 'standard';
    });

export type TrainSchedule = {
  allowances: Allowance[];
  comfort: RollingStockComfortType;
  departure_time: number;
  id: number;
  initial_speed: number;
  labels: string[];
  options: TrainScheduleOptions | null;
  path_id: number;
  power_restriction_ranges: RjsPowerRestrictionRange[] | null;
  rolling_stock_id: number;
  scheduled_points: ScheduledPoint[];
  speed_limit_tags: string | null;
  timetable_id: number;
  train_name: string;
};

export type ElectrificationUsage =
  | {
      mode: string;
      mode_handled: boolean;
      object_type: 'Electrified';
      profile?: string | null;
      profile_handled: boolean;
    }
  | {
      lower_pantograph: boolean;
      object_type: 'Neutral';
    }
  | {
      object_type: 'NonElectrified';
    };

export type ElectrificationRange = {
  electrificationUsage: ElectrificationUsage;
  start: number;
  stop: number;
};

export type MrspPoint = {
  position: number;
  speed: number;
};

export type Mrsp = MrspPoint[];

export type Slope = {
  gradient: number;
  position: number;
};

export type SimulationPowerRestrictionRange = {
  code: string;
  handled: boolean;
  start: number;
  stop: number;
};

export type GetCurvePoint = {
  position: number;
  time: number;
};

export type ResultStops = {
  ch: string | null;
  duration: number;
  position: number;
  time: number;
};
export type FullResultStops = ResultStops & {
  id: string | null;
  line_code: number | null;
  line_name: string | null;
  name: string | null;
  track_name: string | null;
  track_number: number | null;
};

export type ResultSpeed = {
  position: number;
  speed: number;
  time: number;
};

export type SignalUpdate = {
  aspect_label: string;
  blinking: boolean;
  color: number;
  position_end?: number | null;
  position_start: number;
  signal_id: string;
  time_end?: number | null;
  time_start: number;
  track: string;
  track_offset?: number | null;
};

export type ReportTrain = {
  head_positions: GetCurvePoint[][];
  mechanical_energy_consumed: number;
  route_aspects: SignalUpdate[];
  speeds: ResultSpeed[];
  stops: FullResultStops[];
  tail_positions: GetCurvePoint[][];
};

export type Curve = {
  position: number;
  radius: number;
};

export type SimulationReport = {
  base: ReportTrain;
  curves: Curve[];
  eco?: ReportTrain | null;
  electrification_ranges: ElectrificationRange[];
  id: number;
  labels: string[];
  name: string;
  path: number;
  power_restriction_ranges: SimulationPowerRestrictionRange[];
  slopes: Slope[];
  speed_limit_tags: string | null;
  vmax: Mrsp;
};

export type TrainScheduleSummary = TrainSchedule & {
  arrival_time: number;
  invalid_reasons: TrainScheduleValidation[];
  mechanical_energy_consumed: MechanicalEnergyConsumedBaseEco;
  path_length: number;
  stops_count: number;
};

// * types from osrd/front/src/reducers/osrdsimultaions/types.ts

export type PowerRestrictionRangeItem = {
  code: string;
  handled: boolean;
  start: number;
  stop: number;
};

export type MergedDataPoint<T = number> = {
  [key: string]: number | T;
  value0: number | T;
  value1: number | T;
};
export type ConsolidatedMergeDataPoint = MergedDataPoint<Date | null>;
export interface AllowancesSetting {
  base: boolean;
  baseBlocks: boolean;
  eco: boolean;
  ecoBlocks: boolean;
}

export type AllowancesSettings = Record<string | number, AllowancesSetting>;
export type Projection = {
  id: number;
  path: number;
};

export interface Position<Time = number> {
  time: Time;
  position: number;
}
export type ConsolidatedPosition<DateType = Date> = Position<DateType | null>;

export type PositionSpeedTime<Time = number> = Position<Time> & {
  speed: number;
};
export type ConsolidatedPositionSpeedTime = PositionSpeedTime<Date>;

export interface Stop {
  id: string | null;
  name: string | null;
  time: number;
  duration: number;
  position: number;
  line_code: number | null;
  track_number: number | null;
  line_name: string | null;
  track_name: string | null;
  ch?: string | null;
}

export interface RouteAspect<Time = number, Color = number> {
  signal_id?: string;
  route_id?: string;
  time_start: Time;
  time_end: Time;
  position_start: number;
  position_end: number;
  color: Color;
  blinking: boolean;
  aspect_label?: string;
  track?: string;
  track_offset?: number;
}
export type ConsolidatedRouteAspect<DateType = Date> = RouteAspect<DateType | null, string>;

export interface SignalAspect<Time = number, Color = number> {
  signal_id: string;
  time_start: Time;
  time_end: Time;
  color: Color;
  blinking: boolean;
  aspect_label: string;
}
export type ConsolidatedSignalAspect<DateType = Date> = SignalAspect<DateType | null, string>;

export interface Regime {
  head_positions: Position[][];
  tail_positions: Position[][];
  speeds: PositionSpeedTime[];
  stops: Stop[];
  route_aspects: RouteAspect[];
  signal_aspects?: SignalAspect[];
  error?: string;
  mechanical_energy_consumed: number;
}

export type MechanicalEnergyConsumedBaseEco = {
  base?: number;
  eco?: number | null;
};

export type ScheduledTrain = TrainScheduleSummary & {
  duration?: number;
};

export interface GradientPosition {
  gradient: number;
  position: number;
}

export interface RadiusPosition {
  radius: number;
  position: number;
}

export interface SpeedPosition {
  speed: number;
  position: number;
}

export interface HeightPosition {
  height: number;
  position: number;
}

export interface SpeedTime<Time = number> {
  speed: number;
  time: Time;
}

export type ConsolidatedSpeedTime = SpeedTime<Date>;

export interface Train {
  electrification_ranges: ElectrificationRange[];
  power_restriction_ranges: PowerRestrictionRangeItem[];
  id: number;
  labels: string[];
  path: number;
  pathLength?: number;
  name: string;
  vmax: SpeedPosition[];
  slopes: GradientPosition[];
  curves: RadiusPosition[];
  base: Regime;
  eco?: Regime;
  margins?: Regime;
  stopsCount?: number;
  isStdcm?: boolean;
  mechanicalEnergyConsumed?: MechanicalEnergyConsumedBaseEco;
  speed_limit_tags?: string;
}

export interface SimulationSnapshot {
  trains: Train[] | SimulationReport[];
}

export type SimulationHistory = SimulationSnapshot[];

export type PositionsSpeedTimes<Time = number> = Record<AllListValues, PositionSpeedTime<Time>>;

export interface SimulationTrain<DateType = Date> {
  id: number;
  isStdcm?: boolean;
  name: string;
  headPosition: ConsolidatedPosition<DateType>[][];
  tailPosition: ConsolidatedPosition<DateType>[][];
  routeAspects: ConsolidatedRouteAspect<DateType>[];
  signalAspects: ConsolidatedSignalAspect[];
  areaBlock?: ConsolidatedMergeDataPoint[][];
  speed: ConsolidatedPositionSpeedTime[];
  eco_headPosition?: ConsolidatedPosition<DateType>[][];
  eco_tailPosition?: ConsolidatedPosition<DateType>[][];
  eco_routeAspects?: ConsolidatedRouteAspect<DateType>[];
  eco_signalAspects?: ConsolidatedSignalAspect[];
  eco_areaBlock?: ConsolidatedMergeDataPoint[][];
  eco_speed?: ConsolidatedPositionSpeedTime[];
}

export enum SPEED_SPACE_SETTINGS_KEYS {
  ALTITUDE = 'altitude',
  CURVES = 'curves',
  MAX_SPEED = 'maxSpeed',
  SLOPES = 'slopes',
  ELECTRICAL_PROFILES = 'electricalProfiles',
  POWER_RESTRICTION = 'powerRestriction',
}
export type SpeedSpaceSettingKey =
  | SPEED_SPACE_SETTINGS_KEYS.ALTITUDE
  | SPEED_SPACE_SETTINGS_KEYS.CURVES
  | SPEED_SPACE_SETTINGS_KEYS.MAX_SPEED
  | SPEED_SPACE_SETTINGS_KEYS.SLOPES
  | SPEED_SPACE_SETTINGS_KEYS.ELECTRICAL_PROFILES
  | SPEED_SPACE_SETTINGS_KEYS.POWER_RESTRICTION;

export type SpeedSpaceSettingsType = { [key in SpeedSpaceSettingKey]: boolean };

export interface OsrdSimulationState {
  redirectToGraph?: boolean;
  isPlaying: boolean;
  isUpdating: boolean;
  allowancesSettings?: AllowancesSettings;
  mustRedraw: boolean;
  selectedProjection?: Projection;
  selectedTrainId?: number;
  speedSpaceSettings: {
    [key in SpeedSpaceSettingKey]: boolean;
  };
  signalBase: typeof SIGNAL_BASE_DEFAULT;
  consolidatedSimulation: SimulationTrain[];
  simulation: {
    past: SimulationHistory;
    present: SimulationSnapshot;
    future: SimulationHistory;
  };
  electricalProfiles?: {
    boundaries: number[];
    values: (
      | {
          electrical_profile_type: 'no_profile';
        }
      | {
          electrical_profile_type: 'profile';
          handled: true;
          profile: string;
          profileColor: string;
          heightLevel: number;
        }
    )[];
  };
}
