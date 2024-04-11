import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import "@osrd-project/ui-core/dist/theme.css";

import RadioGroup, { RadioGroupProps } from "../components/inputs/RadioGroup";

const options: RadioGroupProps = {
  label: "Choose a label",
  subtitle: "Choose a subtitle",
  required: true,
  options: [
    { label: "Option 1", value: "option1", checked: false, onChange: (value: string) => console.log(value) },
    { label: "Option 2", value: "option2", checked: false, onChange: (value: string) => console.log(value) },
    {
      label: "Option 3",
      value: "option3",
      checked: false,
      onChange: (value: string) => console.log(value),
    },
    {
      label: "Option 4",
      value: "option4",
      checked: false,
      disabled: true,
      onChange: (value: string) => console.log(value),
      hint: "This option is disabled",
    },
    {
      label: "Option 5",
      value: "option5",
      checked: true,
      disabled: false,
      onChange: (value: string) => console.log(value),
    },
  ],
};

export default {
  component: RadioGroup,
  args: options,
  tags: ["autodocs"],
} as Meta;

export const WarningRadioButton = {
  component: RadioGroup,
  args: {
    ...options,
    statusWithMessage: {
      status: "warning",
      message: "This is a warning message.",
    },
  },
} as Meta;
export const InfoRadioButton = {
  component: RadioGroup,
  args: {
    ...options,
    statusWithMessage: {
      status: "info",
      message: "This is an info message.",
    },
  },
} as Meta;
export const ErrorRadioButton = {
  component: RadioGroup,
  args: {
    ...options,
    statusWithMessage: {
      status: "error",
      message: "This is an error message.",
    },
  },
} as Meta;

export const ReadOnlyRadioButton = {
  component: RadioGroup,
  args: {
    ...options,
    label: "This is a read-only radio button group",
    subtitle: "Choose a subtitle",
    readonly: true,
  },
} as Meta;

const meta: StoryFn<RadioGroupProps> = (args: RadioGroupProps) => <RadioGroup {...args} />;

export const Default = meta;
