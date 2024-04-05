import type { Meta, StoryObj } from "@storybook/react";
import "@osrd-project/ui-core/dist/theme.css";

import Input from "../components/inputs/Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input",
  tags: ["autodocs"],
  args: {
    small: false,
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Your name",
    type: "text",
    title: "Default Input",
  },
};

export const Value: Story = {
  args: {
    label: "Your name",
    type: "text",
    value: "Manuel",
    title: "Input with Value",
  },
};

export const Hint: Story = {
  args: {
    label: "Your name",
    type: "text",
    value: "Manuel",
    hint: "It doesn't have to be real",
    title: "Input with Hint",
  },
};

export const LeadingContent: Story = {
  args: {
    label: "Price",
    type: "number",
    leadingContent: "£",
    title: "Input with Leading Content",
  },
};

export const TrainlingContent: Story = {
  args: {
    label: "Price",
    type: "number",
    trailingContent: "€",
    title: "Input with Trailing Content",
  },
};

export const LeadingAndTrainlingContent: Story = {
  args: {
    label: "Price",
    type: "number",
    leadingContent: "Minimum",
    trailingContent: "Km/h",
    title: "Input with Leading and Trailing Content",
  },
};

export const RequiredInput: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
    title: "Required Input",
  },
};

export const LoadingInput: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Manuel",
    statusWithMessage: {
      status: "loading",
    },
    title: "Loading Input",
  },
};

export const SuccessInput: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
    value: "jean-michel.halleurt@exemple.fr",
    statusWithMessage: {
      status: "success",
    },
    title: "Success Input",
  },
};

export const InformationInput: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Jean-Michel Halleurt",
    statusWithMessage: {
      status: "info",
      message: "You won’t be able to change it",
    },
    title: "Information Input",
  },
};

export const WarningInput: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
    value: "Jean-Michel Halleurt",
    statusWithMessage: {
      status: "warning",
      message: "Don’t be a troll, please",
    },
    title: "Warning Input",
  },
};

export const WarningWithoutMessageInput: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
    value: "Jean-Michel Halleurt",
    statusWithMessage: {
      status: "warning",
    },
    title: "Warning Input without Message",
  },
};

export const ErrorInput: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Michel Sardou",
    statusWithMessage: {
      status: "error",
      message: "“Michel Sardou” can’t be used",
    },
    title: "Error Input",
  },
};

export const ErrorWithoutMessageInput: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Michel Sardou",
    statusWithMessage: {
      status: "error",
    },
    title: "Error Input without Message",
  },
};
