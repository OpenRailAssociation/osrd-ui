import React, { type HTMLAttributes } from 'react';

import { type WaypointMenuItem } from '../types';

type WaypointMenuProps = HTMLAttributes<unknown> & {
  items: WaypointMenuItem[];
};

/**
 * An optional menu to handle some actions when clicking on a waypoint
 *
 * The menu doesn't have any styles by default so the user can customize it as needed
 *
 * Styles need to be send from the application with props
 */
const WaypointMenu = ({ items, className }: WaypointMenuProps) => (
  <div className={className}>
    {items.map(({ title, icon, onClick }) => (
      <button
        key={title}
        type="button"
        onClick={(e) => {
          onClick(e);
        }}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </button>
    ))}
  </div>
);

export default WaypointMenu;
