import React from 'react';

export type MenuItem = {
  title: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
};

type MenuProps = {
  items: MenuItem[];
};

/**
 * Example of waypoint menu that could be passed to the manchette as props
 */
const Menu = ({ items }: MenuProps) => (
  <div className="menu">
    {items.map(({ title, icon, onClick }) => (
      <button key={title} type="button" className="menu-item" onClick={onClick}>
        <span className="icon">{icon}</span>
        <span>{title}</span>
      </button>
    ))}
  </div>
);

export default Menu;
