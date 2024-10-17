import React, { useRef, useState } from 'react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { EyeClosed, Telescope } from '@osrd-project/ui-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { SAMPLE_PATH_PROPERTIES_DATA } from './assets/sampleData';
import Menu, { type MenuItem } from './components/Menu';
import Manchette from '../components/Manchette';
import { type StyledOperationalPointType } from '../types';

const OperationalPointListData: StyledOperationalPointType[] =
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
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [activeOperationalPointId, setActiveOperationalPointId] = useState<string>();

  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      title: 'Action 1',
      icon: <EyeClosed />,
      onClick: () => {
        setMenuPosition(null);
        setActiveOperationalPointId(undefined);
      },
    },
    {
      title: 'Action 2',
      icon: <Telescope />,
      onClick: () => {
        setMenuPosition(null);
        setActiveOperationalPointId(undefined);
      },
    },
  ];

  const handleWaypointClick = (id: string, ref: HTMLDivElement | null) => {
    if (!ref) return;
    const position = ref.getBoundingClientRect();
    setMenuPosition({ top: position.bottom - 2, left: position.left });
    setActiveOperationalPointId(id);
  };

  return (
    <Manchette
      operationalPoints={OperationalPointListData.map((op) => ({
        ...op,
        onClick: (id, ref) => {
          handleWaypointClick(id, ref);
        },
      }))}
      zoomYIn={() => {}}
      zoomYOut={() => {}}
      resetZoom={() => {}}
      toggleMode={() => {}}
      activeOperationalPointId={activeOperationalPointId}
    >
      {menuPosition && (
        <Menu
          menuRef={menuRef}
          items={menuItems}
          style={{ width: '305px', top: menuPosition.top, left: menuPosition.left }}
        />
      )}
    </Manchette>
  );
};

export default meta;
type Story = StoryObj<typeof ManchetteWithWaypointMenu>;

export const Default: Story = {
  args: {
    operationalPoints: OperationalPointListData,
  },
};

export const WaypointMenu = () => <ManchetteWithWaypointMenu />;
