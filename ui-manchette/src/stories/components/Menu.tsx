import React from 'react';

export type MenuItem = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

type MenuProps = {
  menuRef: React.RefObject<HTMLDivElement>;
  items: MenuItem[];
  style?: React.CSSProperties;
};

const Menu = ({ menuRef, items, style }: MenuProps) => (
  <div ref={menuRef} className="menu" style={style}>
    {items.map(({ title, icon, onClick }) => (
      <button key={title} type="button" className="menu-item" onClick={onClick}>
        <span className="icon">{icon}</span>
        <span>{title}</span>
      </button>
    ))}
  </div>
);

export default Menu;
