export const positionMmtoKm = (position: number) => {
  return Math.round((position / 1000000) * 10) / 10;
};
