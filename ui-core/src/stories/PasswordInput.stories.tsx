import type { Meta, StoryObj } from "@storybook/react";
import "@osrd-project/ui-core/dist/theme.css";

import PasswordInput from "../components/inputs/PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "PasswordInput",
  component: PasswordInput,
  args: {
    label: "Password",
    hint: "You can uses spaces",
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {},
};
