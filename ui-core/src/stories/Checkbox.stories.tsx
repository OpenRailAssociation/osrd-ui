import type { Meta, StoryObj } from "@storybook/react";
import "@osrd-project/ui-core/dist/theme.css";
import Checkbox from "../components/inputs/checkbox/Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Checkbox",
  argTypes: {
    isChecked: { control: "boolean" },
    isIndeterminate: { control: "boolean" },
    small: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox",
  },
};
export const Checked: Story = {
  args: {
    ...Default.args,
    isChecked: true,
  },
};
export const Indeterminate: Story = {
  args: {
    ...Default.args,
    isIndeterminate: true,
  },
};
export const Small: Story = {
  args: {
    ...Default.args,
    small: true,
  },
};
export const SmallChecked: Story = {
  args: {
    ...Small.args,
    isChecked: true,
  },
};
export const SmallIndeterminate: Story = {
  args: {
    ...Small.args,
    isIndeterminate: true,
  },
};
