// Colors:
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

// The list of breakpoints, in px/minute:
export const BREAKPOINTS = [0.2, 0.4, 0.8, 2.4, 12, 32, 72, Infinity] as const;
// The list of ranges to mark, in ms:
export const TIME_RANGES = [
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
] as const;
