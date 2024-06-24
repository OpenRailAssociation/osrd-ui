import React from 'react';
import { CheckboxState, CheckboxTreeItem, ItemStates } from './type';
import Checkbox from './Checkbox';

import cx from 'classnames';

export type CheckboxListProps = {
  items: CheckboxTreeItem[];
  onClickItem: (e: React.MouseEvent<HTMLInputElement, MouseEvent>, item: CheckboxTreeItem) => void;
  itemStates?: ItemStates;
  small?: boolean;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const CheckboxList: React.FC<CheckboxListProps> = (checkBoxListprops) => {
  const {
    items,
    onClickItem,
    itemStates = {},
    small = false,
    label = '',
    readOnly = false,
    disabled = false,
  } = checkBoxListprops;

  return (
    <>
      <span className="checkbox-list-label">{label}</span>
      <ul className={cx('checkbox-list', { small: small })}>
        {items.map((item) => {
          const { id, props, items: subItems } = item;
          const itemState = itemStates[id] || CheckboxState.UNCHECKED;
          return (
            <li key={id}>
              <Checkbox
                small={small}
                onClick={(e) => onClickItem(e, item)}
                checked={itemState === CheckboxState.CHECKED}
                isIndeterminate={itemState === CheckboxState.INDETERMINATE}
                {...props}
                disabled={disabled}
                readOnly={readOnly}
              />
              {subItems && <CheckboxList {...checkBoxListprops} items={subItems} />}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CheckboxList;
