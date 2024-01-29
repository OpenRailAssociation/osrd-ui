import React from 'react';
import { CheckboxState, checkboxListItem } from './type';
import Checkbox from './Checkbox';

import cx from 'classnames';

export type CheckboxListProps = {
  items: checkboxListItem[];
  idsToRender?: number[];
  onClick?: (id: number) => void;
  getStateForId: (id: number) => CheckboxState;
  small?: boolean;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  getStateForId,
  idsToRender = items.filter((i) => i.parentId == null).map((i) => i.id),
  onClick = () => {},
  small = false,
  label = '',
  readOnly = false,
  disabled = false,
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
        disabled={disabled}
        readOnly={readOnly}
      />
    ) : null;
  };

  return (
    <>
      <span className="checkbox-list-label">{label}</span>
      <ul className={cx('checkbox-list', { small: small })}>
        {idsToRender.map((id) => {
          const item = items.find((i) => i.id === id);
          if (!item) return null;
          const checkboxState = getStateForId(id);
          return (
            <li key={item.id}>
              <Checkbox
                small={small}
                onClick={() => onClick(item.id)}
                checked={checkboxState === CheckboxState.CHECKED}
                isIndeterminate={checkboxState === CheckboxState.INDETERMINATE}
                {...item.checkboxProps}
                disabled={disabled}
                readOnly={readOnly}
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
