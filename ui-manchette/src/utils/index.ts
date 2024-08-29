import { BASE_OP_HEIGHT, FOOTER_HEIGHT } from '../components/consts';

export const getHeightWithoutLastWaypoint = (height: number) =>
  height - FOOTER_HEIGHT - BASE_OP_HEIGHT;

export const positionMmToKm = (position: number) => Math.round((position / 1000000) * 10) / 10;

export const msToS = (time: number) => time / 1000;
