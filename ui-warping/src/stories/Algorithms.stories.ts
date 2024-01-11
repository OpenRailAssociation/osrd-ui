import type { Meta, StoryObj } from '@storybook/react';

import { DEFAULT_WARPING_OPTIONS } from '../core/getWarping.ts';
import Algorithms from './Algorithms.tsx';
import { DEFAULT_PATH_NAME, PATH_NAMES } from './helpers.ts';

const meta: Meta<typeof Algorithms> = {
  component: Algorithms,
  title: 'WarpedMap algorithms',
  argTypes: {
    path: {
      name: 'Path',
      options: PATH_NAMES,
      defaultValue: DEFAULT_PATH_NAME,
      control: { type: 'radio' },
    },
    tolerance: {
      name: 'Tolerance',
      defaultValue: DEFAULT_WARPING_OPTIONS.tolerance,
      type: 'number',
    },
    samplesCount: {
      name: 'Samples count',
      defaultValue: DEFAULT_WARPING_OPTIONS.samplesCount,
      type: 'number',
    },
    straightenForce: {
      name: 'Straighten force',
      defaultValue: DEFAULT_WARPING_OPTIONS.straightenForce,
      type: 'number',
    },
    straightenIterations: {
      name: 'Straighten iterations',
      defaultValue: DEFAULT_WARPING_OPTIONS.straightenIterations,
      type: 'number',
    },
    quadtreeDepth: {
      name: 'Quadtree depth',
      defaultValue: DEFAULT_WARPING_OPTIONS.quadtreeDepth,
      type: 'number',
    },
    stripsPerSide: {
      name: 'Strips per side',
      defaultValue: DEFAULT_WARPING_OPTIONS.stripsPerSide,
      type: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Algorithms>;

export const Primary: Story = {};
