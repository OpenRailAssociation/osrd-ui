import { type Waypoint } from '../../types';

export const SAMPLE_WAYPOINTS: Waypoint[] = [
  {
    id: 'South_West_station',
    name: 'South_West_station',
    secondaryCode: 'BV',
    position: 0,
    weight: 100,
    tracks: [
      { id: '1', name: 'EV', line: '123456' },
      { id: '2', name: '2', line: '456123' },
      { id: '3', name: '2bis', line: '135246' },
      { id: '4', name: 'Z', line: '654321' },
    ],
  },
  {
    id: 'Mid_West_station',
    name: 'Mid_West_station',
    secondaryCode: 'BV',
    position: 13000000,
    weight: 30,
    tracks: [
      { id: '1', name: 'EV', line: '123456' },
      { id: '2', name: '2', line: '456123' },
      { id: '3', name: '1bis', line: '615243' },
    ],
  },
  {
    id: 'Mid_East_station',
    name: 'Mid_East_station',
    secondaryCode: 'BV',
    position: 27550000,
    weight: 50,
    tracks: [
      { id: '1', name: 'EV', line: '123456' },
      { id: '2', name: '1', line: '523416' },
    ],
  },
  {
    id: 'North_East_station',
    name: 'North_East_station',
    secondaryCode: 'BV',
    position: 47050000,
    weight: 100,
    tracks: [{ id: '1', name: 'EV', line: '123456' }],
  },
];
