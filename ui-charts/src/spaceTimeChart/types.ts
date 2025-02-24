export type WorkSchedule = {
  type: 'TRACK' | 'CATENARY';
  timeStart: Date;
  timeEnd: Date;
  spaceRanges: [number, number][];
};
