import React from 'react';
import { CheckboxTreeItem } from './type';
import Checkbox from './Checkbox';

import cx from 'classnames';

export type CheckboxListProps = {
  items: CheckboxTreeItem[];
  onClickItem: (e: React.MouseEvent<HTMLInputElement, MouseEvent>, item: CheckboxTreeItem) => void;
  small?: boolean;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const CheckboxList: React.FC<CheckboxListProps> = (checkBoxListprops) => {
  const {
    items,
    onClickItem,
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
          return (
            <li key={id}>
              <Checkbox
                small={small}
                onClick={(e) => onClickItem(e, item)}
                checked={item.props.checked}
                isIndeterminate={item.props.isIndeterminate}
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
