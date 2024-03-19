import type { Meta, StoryObj } from "@storybook/react";
import "@osrd-project/ui-core/dist/theme.css";
import Tree from "../components/inputs/checkbox/Tree";

const meta: Meta<typeof Tree> = {
  component: Tree,
  title: "Tree",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tree>;

const items = [
  {
    id: 1,
    name: "foo",
    items: [
      {
        id: 2,
        name: "foo2",
        items: [
          { id: 3, name: "foo3" },
          { id: 4, name: "foo4" },
        ],
      },
      {
        id: 5,
        name: "foo5",
        items: [
          {
            id: 6,
            name: "foo6",
            items: [
              { id: 8, name: "foo8" },
              { id: 9, name: "foo9" },
            ],
          },
        ],
      },
    ],
  },
  { id: 7, name: "foo7" },
];

export const Default: Story = {
  args: {
    items: items,
  },
};
