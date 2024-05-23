// Colors:
import { type SpaceTimeChartTheme } from './types';

export const BLACK = '#000000';
export const BLUE = '#2170B9';
export const GREY_10 = '#EDEDED';
export const GREY_30 = '#B6B2AF';
export const GREY_50 = '#797671';
export const WHITE_75 = '#FFFFFFC0';
export const AMBIANT_A10 = '#EFF3F5';
export const ERROR_30 = '#FF6868';
export const ERROR_60 = '#D91C1C';

// Fonts:
export const FONT_SIZE = 10;
export const FONT = 'IBM Plex Sans';

// Here are some helpers to write code about time in ms that is humanly readable:
export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;

// Same for distances in meters:
export const KILOMETER = 1000;

export const DEFAULT_THEME: SpaceTimeChartTheme = {
  background: 'white',
  breakpoints: [0.2, 0.4, 0.8, 2.4, 12, 32, 72, Infinity],
  timeRanges: [
    10 * SECOND,
    30 * SECOND,
    1 * MINUTE,
    5 * MINUTE,
    15 * MINUTE,
    30 * MINUTE,
    1 * HOUR,
    3 * HOUR,
    6 * HOUR,
    12 * HOUR,
    24 * HOUR,
  ],
  pathsStyles: {
    font: `${FONT_SIZE}px ${FONT}`,
  },
  spaceGraduationsStyles: {
    1: {
      width: 0.5,
      color: BLUE,
      opacity: 0.75,
    },
    2: {
      width: 0.5,
      color: BLUE,
      opacity: 0.25,
    },
    3: {
      width: 0.5,
      color: GREY_10,
    },
  },
  // The following matrix indicate, for various zoom levels, what time marks should be represented,
  // and with which priority level:
  // - Each line corresponds to a breakpoint, in the same order as in the BREAKPOINTS array
  // - Each column corresponds to a time range, in the same order as in the TIME_RANGES array
  timeCaptionsPriorities: [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
    [0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1],
  ],
  timeCaptionsStyles: {
    1: {
      color: GREY_50,
      font: `12px ${FONT}`,
      topOffset: 11,
    },
    2: {
      color: GREY_30,
      font: `12px ${FONT}`,
      topOffset: 9,
    },
    3: {
      color: GREY_30,
      font: `10px ${FONT}`,
      topOffset: 6,
    },
    4: {
      color: GREY_30,
      font: `8px ${FONT}`,
      topOffset: 8,
    },
  },
  // The following matrix indicate, for various zoom levels, what time marks should be represented,
  // and with which priority level:
  // - Each line corresponds to a breakpoint, in the same order as in the BREAKPOINTS array
  // - Each column corresponds to a time range, in the same order as in the TIME_RANGES array
  timeGraduationsPriorities: [
    [0, 0, 0, 0, 0, 0, 0, 4, 3, 2, 1],
    [0, 0, 0, 0, 0, 0, 4, 3, 3, 2, 1],
    [0, 0, 0, 0, 0, 6, 4, 3, 3, 2, 1],
    [0, 0, 0, 0, 6, 5, 4, 3, 3, 2, 1],
    [0, 0, 0, 6, 5, 4, 3, 2, 2, 2, 1],
    [0, 0, 6, 5, 4, 4, 3, 2, 2, 2, 1],
    [0, 6, 5, 4, 4, 4, 3, 2, 2, 2, 1],
    [6, 0, 5, 4, 4, 4, 3, 2, 2, 2, 1],
  ],
  timeGraduationsStyles: {
    1: {
      width: 0.5,
      color: BLACK,
    },
    2: {
      width: 0.5,
      color: BLUE,
      opacity: 0.77,
    },
    3: {
      width: 0.5,
      color: BLUE,
      opacity: 0.5,
    },
    4: {
      width: 0.5,
      color: BLUE,
      opacity: 0.5,
      dashArray: [6, 6],
    },
    5: {
      width: 0.5,
      color: BLUE,
      opacity: 0.5,
      dashArray: [6, 18],
    },
    6: {
      width: 1,
      color: BLUE,
      opacity: 0.5,
      dashArray: [1, 12],
    },
  },
};
