import { BASE_OP_HEIGHT, FOOTER_HEIGHT } from '../consts';

export const getHeightWithoutLastWaypoint = (height: number) =>
  height - FOOTER_HEIGHT - BASE_OP_HEIGHT;

export const positionMmToKm = (position: number) => Math.round((position / 1000000) * 10) / 10;

export const msToS = (time: number) => time / 1000;

export const calcTotalDistance = <T extends { position: number }>(ops: T[]) =>
  ops.at(-1)!.position - ops.at(0)!.position;
