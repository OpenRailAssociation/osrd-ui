import { PathProperties } from '../../types';

export const SAMPLE_DATA: PathProperties = {
  slopes: {
    boundaries: [
      6550000, 6850000, 7250000, 7550000, 9550000, 9850000, 10250000, 10550000, 19550000, 20550000,
      21550000, 22550000, 27550000, 28550000, 29550000, 30550000,
    ],
    values: [
      0.0, -3.0, -6.0, -3.0, 0.0, 3.0, 6.0, 3.0, 0.0, 3.0, 6.0, 3.0, 0.0, -3.0, -6.0, -3.0, 0.0,
    ],
  },
  curves: null,
  electrifications: {
    boundaries: [13550000, 38550000],
    values: [
      {
        type: 'electrification',
        voltage: '25000V',
      },
      {
        type: 'non_electrified',
      },
      {
        type: 'electrification',
        voltage: '25000V',
      },
    ],
  },
  geometry: {
    type: 'LineString',
    coordinates: [
      [-0.3935990747874243, 49.49],
      [-0.373, 49.49],
      [-0.37, 49.492],
      [-0.37, 49.49749566692346],
      [-0.37, 49.49979999999999],
      [-0.3675, 49.499849999999995],
      [-0.365, 49.4999],
      [-0.36401, 49.4999],
      [-0.35509999999999997, 49.4999],
      [-0.3463, 49.4999],
      [-0.3375, 49.4999],
      [-0.3287, 49.4999],
      [-0.3199, 49.4999],
      [-0.31099, 49.4999],
      [-0.31, 49.4999],
      [-0.30748, 49.4999],
      [-0.29852, 49.4999],
      [-0.296, 49.4999],
      [-0.29510719999999996, 49.4999],
      [-0.28738199999999997, 49.4999],
      [-0.279756, 49.4999],
      [-0.27213, 49.4999],
      [-0.26450399999999996, 49.4999],
      [-0.256878, 49.4999],
      [-0.24925199999999997, 49.4999],
      [-0.241626, 49.4999],
      [-0.234, 49.4999],
      [-0.226374, 49.4999],
      [-0.218748, 49.4999],
      [-0.211122, 49.4999],
      [-0.203496, 49.4999],
      [-0.19587, 49.4999],
      [-0.18824399999999997, 49.4999],
      [-0.180618, 49.4999],
      [-0.1728928, 49.4999],
      [-0.172, 49.4999],
      [-0.1697798132267551, 49.4999],
      [-0.1372170738858298, 49.4999],
      [-0.1354, 49.4999],
      [-0.135, 49.49995],
      [-0.1346, 49.4999],
      [-0.13230255256768042, 49.4999],
      [-0.12270056031973472, 49.4999],
      [-0.12, 49.4999],
      [-0.1199, 49.4999],
      [-0.11892761130523458, 49.50049510188119],
      [-0.1149, 49.50296],
      [-0.1149, 49.50997],
      [-0.1099, 49.512899999999995],
      [-0.10924003772863546, 49.512899999999995],
      [-0.108, 49.512899999999995],
      [-0.10638, 49.512899999999995],
      [-0.0945, 49.512899999999995],
    ],
  },
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
