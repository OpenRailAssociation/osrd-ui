import { type electricalProfilesDesignValues } from '../stories/assets/const';

export type Simulation = {
  status: string;
  base: {
    positions: number[];
    speeds: number[];
  };
  final_output: {
    positions: number[];
    speeds: number[];
  };
  electrical_profiles: {
    boundaries: number[];
    values: {
      electrical_profile_type: 'profile' | 'no_profile';
      profile?: keyof typeof electricalProfilesDesignValues | null;
      handled?: boolean;
    }[];
  };
};

export type PathProperties = {
  slopes: {
    boundaries: number[];
    values: number[];
  };
  electrifications: {
    boundaries: number[];
    values: {
      type: 'electrification' | 'neutral_section';
      voltage?: '1500V' | '25000V';
      lower_pantograph?: boolean;
    }[];
  };
  operational_points: {
    extensions: {
      ch: string;
      identifier: {
        name: string;
      };
    };
    position: number;
  }[];
};
