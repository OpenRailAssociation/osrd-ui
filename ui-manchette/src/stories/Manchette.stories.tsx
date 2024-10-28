import React, { useRef, useState } from 'react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { EyeClosed, Telescope } from '@osrd-project/ui-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import Menu, { type MenuItem } from './components/Menu';
import Manchette from '../components/Manchette';

const meta: Meta<typeof Manchette> = {
  component: Manchette,
  title: 'Manchette/Manchette',
  tags: ['autodocs'],
  argTypes: {
    waypoints: {
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
  const [activeWaypointId, setActiveWaypointId] = useState<string>();

  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      title: 'Action 1',
      icon: <EyeClosed />,
      onClick: () => {
        setMenuPosition(null);
        setActiveWaypointId(undefined);
      },
    },
    {
      title: 'Action 2',
      icon: <Telescope />,
      onClick: () => {
        setMenuPosition(null);
        setActiveWaypointId(undefined);
      },
    },
  ];

  const handleWaypointClick = (id: string, ref: HTMLDivElement | null) => {
    if (!ref) return;
    const position = ref.getBoundingClientRect();
    setMenuPosition({ top: position.bottom - 2, left: position.left });
    setActiveWaypointId(id);
  };

  return (
    <Manchette
      waypoints={SAMPLE_WAYPOINTS.map((waypoint) => ({
        ...waypoint,
        display: true,
        onClick: (id, ref) => {
          handleWaypointClick(id, ref);
        },
      }))}
      zoomYIn={() => {}}
      zoomYOut={() => {}}
      resetZoom={() => {}}
      toggleMode={() => {}}
      activeWaypointId={activeWaypointId}
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
    waypoints: SAMPLE_WAYPOINTS.map((waypoint) => ({ ...waypoint, display: true })),
  },
};

export const WaypointMenu = () => <ManchetteWithWaypointMenu />;
