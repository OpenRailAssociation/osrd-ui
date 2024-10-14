import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_PATH_PROPERTIES_DATA } from './assets/sampleData';
import OperationalPoint from '../components/OperationalPoint';

const { id, extensions, part, position } =
  SAMPLE_PATH_PROPERTIES_DATA.operational_points?.[0] ?? {};

const meta: Meta<typeof OperationalPoint> = {
  component: OperationalPoint,
  title: 'Manchette/OperationalPoint',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OperationalPoint>;

export const Default: Story = {
  args: {
    extensions,
    id,
    part,
    position,
    display: true,
  },
};
