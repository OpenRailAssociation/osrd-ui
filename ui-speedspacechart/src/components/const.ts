import { type ColorDictionary, type Store } from '../types/chartTypes';

export const SLOPE_FILL_COLOR = '#CFDDCE';

export const RIGHT_TICK_HEIGHT_OFFSET = 2;

export const TICK_ICONS = {
  Y_LEFT_VERTICAL: 30,
  Y_LEFT_HORIZONTAL: 22,
  Y_RIGHT_VERTICAL: 36,
  Y_RIGHT_HORIZONTAL: 42,
};

export const MARGINS = {
  MARGIN_LEFT: 48,
  MARGIN_RIGHT: 12,
  MARGIN_TOP: 27,
  MARGIN_BOTTOM: 52.5,
  CURVE_MARGIN_TOP: 40,
  CURVE_MARGIN_SIDES: 16,
  ELECTRICAL_PROFILES_MARGIN_TOP: 8,
  RIGHT_TICK_MARGINS: 60,
  OFFSET_RIGHT_AXIS: 42,
};

export const LINEAR_LAYERS_HEIGHTS = {
  ELECTRICAL_PROFILES_HEIGHT: 56,
  POWER_RESTRICTIONS_HEIGHT: 40,
  SPEED_LIMIT_TAGS_HEIGHT: 40,
};

export const LINEAR_LAYERS_HEIGHTS_BY_NAME = {
  electricalProfiles: LINEAR_LAYERS_HEIGHTS.ELECTRICAL_PROFILES_HEIGHT,
  powerRestrictions: LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS_HEIGHT,
  speedLimitTags: LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT,
};

export const LINEAR_LAYER_SEPARATOR_HEIGHT = 1;

export const LINEAR_LAYERS_BACKGROUND_COLOR = {
  FIRST: 'rgb(250, 249, 245)',
  SECOND: 'rgb(247, 246, 238)',
  THIRD: 'rgb(242, 240, 228)',
};

export const FRONT_INTERACTIVITY_LAYER_ID = '#front-interactivity-layer';

export const DETAILS_BOX_SELECTION: Array<keyof Store['detailsBoxDisplay']> = [
  'energySource',
  'tractionStatus',
  'declivities',
  'electricalProfiles',
  'powerRestrictions',
];

export const LAYERS_SELECTION: Array<keyof Store['layersDisplay']> = [
  'steps',
  'declivities',
  'speedLimits',
  'temporarySpeedLimits',
  'electricalProfiles',
  'powerRestrictions',
  'speedLimitTags',
];

/**
 * COLOR_DICTIONARY maps specific colors to their corresponding secondary colors used for speed limit tags.
 */
export const COLOR_DICTIONARY: ColorDictionary = {
  '#216482': '#E5F7FF',
  '#D91C1C': '#F15981',
  '#494641': '#F2F0E4',
  '#EAA72B': '#EAA72B',
  '#94918E': '#94918E',
};
