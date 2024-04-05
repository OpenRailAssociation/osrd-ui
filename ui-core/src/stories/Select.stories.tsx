import { StoryObj, Meta } from "@storybook/react";

import Select from "../components/Select";
import "@osrd-project/ui-core/dist/theme.css";

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    placeholder: "Select an option",
    label: "Select",
    hint: "Select an option",
  },
  title: "Select",
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};
