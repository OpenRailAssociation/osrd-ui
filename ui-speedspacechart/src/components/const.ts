import { Store } from '../types/chartTypes';

export const MARGINS = {
  MARGIN_LEFT: 48,
  MARGIN_RIGHT: 12,
  MARGIN_TOP: 27,
  MARGIN_BOTTOM: 52.5,
  CURVE_MARGIN_TOP: 40,
  CURVE_MARGIN_SIDES: 16,
  ELECTRICAL_PROFILES_MARGIN_TOP: 8,
};

export const LAYERS_HEIGHTS = {
  ELECTRICAL_PROFILES_HEIGHT: 56,
  POWER_RESTRICTIONS_HEIGHT: 40,
  SPEED_LIMIT_TAGS_HEIGHT: 40,
};

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
