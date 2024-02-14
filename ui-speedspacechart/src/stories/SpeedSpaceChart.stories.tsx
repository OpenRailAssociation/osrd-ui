import type { Meta } from "@storybook/react";
import SpeedSpaceChart, {
  SpeedSpaceChartProps,
} from "../components/SpeedSpaceChart";
import OSRD_SAMPLE from "./assets/sampleData";

export default {
  title: "SpeedSpaceChart",
  component: SpeedSpaceChart,
} as Meta<typeof SpeedSpaceChart>;

const defaultArgs: SpeedSpaceChartProps = {
  width: 1200,
  height: 400,
  sample: OSRD_SAMPLE,
};

export const SpeedSpaceChartDefault = {
  args: {
    ...defaultArgs,
  },
};
