import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {
  TrackOccupancyManchette,
  TrackOccupancyCanvas,
} from '../../../ui-trackoccupancydiagram/src/index';

const TrackOccupancyDiagram = () => (
  <div>
    <TrackOccupancyManchette />
    <TrackOccupancyCanvas />
  </div>
);

const meta: Meta<typeof TrackOccupancyDiagram> = {
  title: 'TrackOccupancyDiagram/Rendering',
  component: TrackOccupancyDiagram,
  decorators: [(Story) => <Story />],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  args: {},

  render: () => <TrackOccupancyDiagram />,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TrackOccupancyDiagram>;

export const TrackOccupancyDiagramStoryDefault: Story = {
  args: {},
};
