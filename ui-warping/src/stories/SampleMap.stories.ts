import type { Meta, StoryObj } from '@storybook/react';

import SampleMap from './SampleMap.tsx';
import { PATH_NAMES } from './helpers.ts';

const meta: Meta<typeof SampleMap> = {
  component: SampleMap,
  title: 'WarpedMap component',
  argTypes: {
    path: {
      options: PATH_NAMES,
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SampleMap>;

export const Primary: Story = {};
