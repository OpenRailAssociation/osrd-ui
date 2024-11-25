export const TRACK_HEIGHT_CONTAINER = 73;
export const CANVAS_PADDING = 8;
export const OCCUPANCY_ZONE_START = 35;
export const OCCUPANCY_ZONE_HEIGHT = 3;
export const MINUTES_TEXT_OFFSET = 6.5;
export const STATION_TEXT_OFFSET = 5;

export const COLORS = {
  GREY_20: 'rgb(211, 209, 207)',
  GREY_50: 'rgb(121, 118, 113)',
  GREY_60: 'rgb(92, 89, 85)',
  GREY_80: 'rgb(49, 46, 43)',
  HOUR_BACKGROUND: 'rgba(243, 248, 253, 0.5)',
  RAIL_TICK: 'rgb(33, 112, 185)',
  WHITE_50: 'rgba(255, 255, 255, 0.5)',
  WHITE_100: 'rgb(255, 255, 255)',
};

export const TICKS_PATTERN = {
  MINUTE: [2, 9, 2],
  FIVE_MINUTES: [6, 9, 6],
  QUARTER_HOUR: [2, 2, 6, 9, 6, 2, 2],
  HALF_HOUR: [2, 2, 2, 2, 6, 9, 6, 2, 2, 2, 2],
  HOUR: [16, 9, 16],
};

export const TICKS_PRIORITIES = [
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
  [0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1],
  [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
];
