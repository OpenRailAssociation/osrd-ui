import React, { useState } from 'react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { EyeClosed, Telescope } from '@osrd-project/ui-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { SAMPLE_PATH_PROPERTIES_DATA } from './assets/sampleData';
import Manchette from '../components/Manchette';
import type { WaypointMenuItem, StyledOperationalPointType } from '../types';

const operationalPointListData: StyledOperationalPointType[] =
  SAMPLE_PATH_PROPERTIES_DATA.operational_points?.map((op) => ({ ...op, display: true })) ?? [];

const meta: Meta<typeof Manchette> = {
  component: Manchette,
  title: 'Manchette/Manchette',
  tags: ['autodocs'],
  argTypes: {
    operationalPoints: {
      control: {
        type: 'object',
      },
    },
    zoomYIn: {
      action: 'zoomYIn',
    },
    zoomYOut: {
      action: 'zoomYOut',
    },
  },
};

const ManchetteWithWaypointMenu = () => {
  const [activeOperationalPointId, setActiveOperationalPointId] = useState<string>();

  const menuItems: WaypointMenuItem[] = [
    {
      title: 'Action 1',
      icon: <EyeClosed />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveOperationalPointId(undefined);
      },
    },
    {
      title: 'Action 2',
      icon: <Telescope />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveOperationalPointId(undefined);
      },
    },
  ];

  const handleWaypointClick = (id: string) => {
    setActiveOperationalPointId(id);
  };

  return (
    <Manchette
      operationalPoints={operationalPointListData.map((op) => ({
        ...op,
        onClick: handleWaypointClick,
      }))}
      zoomYIn={() => {}}
      zoomYOut={() => {}}
      resetZoom={() => {}}
      toggleMode={() => {}}
      waypointMenuData={{
        activeOperationalPointId,
        waypointMenuItems: menuItems,
        waypointMenuClassName: 'menu',
      }}
    />
  );
};

export default meta;
type Story = StoryObj<typeof ManchetteWithWaypointMenu>;

export const Default: Story = {
  args: {
    operationalPoints: operationalPointListData,
  },
};

export const WaypointMenu = () => <ManchetteWithWaypointMenu />;
