export const SIGNAL_BASE_DEFAULT = "BAL3";

export const LIST_VALUES = {
  SPACE_TIME: [
    "headPosition",
    "tailPosition",
    "speed",
    "margins_speed",
    "eco_speed",
    "eco_headPosition",
    "eco_tailPosition",
  ],
  SPACE_SPEED: ["speed", "margins_speed", "eco_speed"],
  SPACE_GRADIENT: ["slopesCurve"],
  REGIME: ["head_positions", "tail_positions", "speeds"],
} as const;
