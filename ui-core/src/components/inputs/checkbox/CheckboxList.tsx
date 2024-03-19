import React from "react";
import Checkbox from "./Checkbox";
import { CheckboxState } from "./Tree";

import cx from "classnames";

export type Item = {
  id: number;
  name: string;
  parentId?: number; // Make parentId optional for root items
};

type CheckboxListProps = {
  items: Item[];
  idsToRender?: number[];
  onClick?: (id: number) => void;
  getStateForId: (id: number) => CheckboxState;
  small?: boolean;
  label?: string;
  required?: boolean;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  getStateForId,
  idsToRender = items.filter((i) => i.parentId == null).map((i) => i.id),
  onClick = () => {},
  small = false,
  label = "",
  required = false,
}) => {
  const getChildNodes = (parentId: number) => {
    const childIds = items.filter((i) => i.parentId === parentId).map((i) => i.id);
    return childIds.length > 0 ? (
      <CheckboxList
        items={items}
        idsToRender={childIds}
        onClick={onClick}
        getStateForId={getStateForId}
        small={small}
      />
    ) : null;
  };

  return (
    <>
      <span className="checkbox-list-label">{label}</span>
      <ul className={cx("checkbox-list", { small: small })}>
        {idsToRender.map((id) => {
          const item = items.find((i) => i.id === id);
          if (!item) return null;
          const checkboxState = getStateForId(id);
          return (
            <li key={item.id}>
              {" "}
              {/* Inline style for list */}
              <Checkbox
                small={small}
                onClick={() => onClick(item.id)}
                isChecked={checkboxState === CheckboxState.CHECKED}
                isIndeterminate={checkboxState === CheckboxState.INDETERMINATE}
                label={item.name}
              />
              {getChildNodes(item.id)}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CheckboxList;
