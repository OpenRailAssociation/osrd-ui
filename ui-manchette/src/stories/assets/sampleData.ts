import { type PathProperties } from '../../types';

export const SAMPLE_PATH_PROPERTIES_DATA: PathProperties = {
  operational_points: [
    {
      id: 'South_West_station',
      part: {
        track: 'TB0',
        position: 500.0,
        extensions: {
          sncf: null,
        },
      },
      extensions: {
        sncf: {
          ci: 0,
          ch: 'BV',
          ch_short_label: 'BV',
          ch_long_label: '0',
          trigram: 'SWS',
        },
        identifier: {
          name: 'South_West_station',
          uic: 1,
        },
      },
      position: 0,
    },
    {
      id: 'Mid_West_station',
      part: {
        track: 'TC2',
        position: 450.0,
        extensions: {
          sncf: null,
        },
      },
      extensions: {
        sncf: {
          ci: 0,
          ch: 'BV',
          ch_short_label: 'BV',
          ch_long_label: '0',
          trigram: 'MWS',
        },
        identifier: {
          name: 'Mid_West_station',
          uic: 3,
        },
      },
      position: 13000000,
    },
    {
      id: 'Mid_East_station',
      part: {
        track: 'TD1',
        position: 14000.0,
        extensions: {
          sncf: null,
        },
      },
      extensions: {
        sncf: {
          ci: 0,
          ch: 'BV',
          ch_short_label: 'BV',
          ch_long_label: '0',
          trigram: 'MES',
        },
        identifier: {
          name: 'Mid_East_station',
          uic: 4,
        },
      },
      position: 27550000,
    },
    {
      id: 'North_East_station',
      part: {
        track: 'TG5',
        position: 1500.0,
        extensions: {
          sncf: null,
        },
      },
      extensions: {
        sncf: {
          ci: 0,
          ch: 'BV',
          ch_short_label: 'BV',
          ch_long_label: '0',
          trigram: 'NES',
        },
        identifier: {
          name: 'North_East_station',
          uic: 7,
        },
      },
      position: 47050000,
    },
  ],
};
