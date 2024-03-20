import type { Meta } from "@storybook/react";
import { type SpeedSpaceChartProps, SpeedSpaceChart } from "../components/SpeedSpaceChart";
import OSRD_SAMPLE from "./assets/sampleData";

export default {
  title: "SpeedSpaceChart",
  component: SpeedSpaceChart,
} as Meta<typeof SpeedSpaceChart>;

const defaultArgs: SpeedSpaceChartProps = {
  width: 1200,
  height: 400,
  data: OSRD_SAMPLE,
};

export const SpeedSpaceChartDefault = {
  args: {
    ...defaultArgs,
  },
};
