import { Meta, StoryObj } from "@storybook/react";
import TextArea from "../components/inputs/TextArea";

import "@osrd-project/ui-core/dist/theme.css";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  args: {
    disabled: false,
    readOnly: false,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Your name",
    type: "text",
  },
};

export const Value: Story = {
  args: {
    label: "Your name",
    type: "text",
    value: "Manuel",
  },
};

export const Hint: Story = {
  args: {
    label: "Your name",
    type: "text",
    value: "Manuel",
    hint: "It doesn't have to be real",
  },
};

export const RequiredTextArea: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
  },
};

export const LoadingTextArea: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Manuel",
    statusWithMessage: {
      status: "loading",
    },
  },
};

export const SuccessTextArea: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
    value: "jean-michel.halleurt@exemple.fr",
    statusWithMessage: {
      status: "success",
    },
  },
};

export const InformationTextArea: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Jean-Michel Halleurt",
    statusWithMessage: {
      status: "info",
      message: "You won’t be able to change it",
    },
  },
};

export const WarningTextArea: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
    value: "Jean-Michel Halleurt",
    statusWithMessage: {
      status: "warning",
      message: "Don’t be a troll, please",
    },
  },
};

export const WarningWithoutMessageTextArea: Story = {
  args: {
    label: "Your name",
    type: "text",
    required: true,
    value: "Jean-Michel Halleurt",
    statusWithMessage: {
      status: "warning",
    },
  },
};

export const ErrorTextArea: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Michel Sardou",
    statusWithMessage: {
      status: "error",
      message: "“Michel Sardou” can’t be used",
    },
  },
};

export const ErrorWithoutMessageTextArea: Story = {
  args: {
    label: "Name",
    type: "text",
    required: true,
    value: "Michel Sardou",
    statusWithMessage: {
      status: "error",
    },
  },
};
