import type { Meta, StoryObj } from "@storybook/react";
import "@osrd-project/ui-core/dist/theme.css";

import TokenInput from "../components/inputs/TokenInput";

const meta: Meta<typeof TokenInput> = {
  component: TokenInput,
  title: "TokenInput",
  args: {
    label: "Favorite colors",
    tokens: ["Yellow", "Orange", "Red", "Black"],
  },
};

export default meta;
type Story = StoryObj<typeof TokenInput>;

export const Default: Story = {
  args: {},
};
