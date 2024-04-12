import type { Meta } from "@storybook/react";
import SpeedSpaceChart, {
  type SpeedSpaceChartProps,
} from "../components/SpeedSpaceChart";
import OSRD_SAMPLE from "./assets/sampleData";

export default {
  title: "SpeedSpaceChart",
  component: SpeedSpaceChart,
} as Meta<typeof SpeedSpaceChart>;

const defaultArgs: SpeedSpaceChartProps = {
  width: 1440,
  height: 521.5,
  data: OSRD_SAMPLE,
};

export const SpeedSpaceChartDefault = {
  args: {
    ...defaultArgs,
  },
};
