import { FOOTER_HEIGHT } from '../components/consts';

export const getHeightWithoutFooter = (height: number) => height - FOOTER_HEIGHT;

export const positionMmToKm = (position: number) => Math.round((position / 1000000) * 10) / 10;

export const msToS = (time: number) => time / 1000;
