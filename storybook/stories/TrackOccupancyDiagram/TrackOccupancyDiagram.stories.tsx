import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-trackoccupancydiagram/dist/theme.css';

import { KebabHorizontal } from '../../../ui-icons/src/index';
import {
  TrackOccupancyManchette,
  TrackOccupancyCanvas,
} from '../../../ui-trackoccupancydiagram/src/index';
import zones from '../samples/TrackOccupancyDiagramSamples/occupancyZone';
import tracks from '../samples/TrackOccupancyDiagramSamples/tracks';

const TrackOccupancyDiagram = () => (
  <div
    className="bg-ambientB-10"
    style={{
      height: 680,
      width: 1920,
      padding: '30px 40px',
    }}
  >
    <div
      style={{
        height: 494,
        width: 1424,
        boxShadow:
          '0px 2px 4px 0 rgba(0, 0, 0, 0.22), 0 4px 7px -3px rgba(255, 171, 88, 0.17), inset 0 1px 0 0 rgb(255, 255, 255)',
        borderRadius: 10,
      }}
    >
      <div
        className="bg-ambientB-5 flex flex-col justify-center"
        style={{
          height: 40,
          width: '100%',
          paddingLeft: 16,
          borderRadius: '10px 10px 0 0',
          boxShadow: 'inset 1px 0 0 0 rgb(255, 255, 255), inset 0 -1px 0 0 rgba(0, 0, 0, 0.25)',
        }}
      >
        <KebabHorizontal />
      </div>
      <div className="flex">
        <div
          style={{
            height: 454,
            width: 200,
            borderRadius: '0 0 0 10px',
          }}
        >
          <TrackOccupancyManchette tracks={tracks} />
        </div>
        <div
          style={{
            height: 454,
            width: 1224,
            borderRadius: '0 0 10px 0',
          }}
        >
          <TrackOccupancyCanvas zones={zones} selectedTrain={null} timeOrigin={0} timeScale={1} />
        </div>
      </div>
    </div>
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
