import React from 'react';
import CheckboxList from './CheckboxList';
import { buildRelationshipMaps, flattenArray, updateItemStatesOptimized } from './updateItemState';
import FieldWrapper, { FieldWrapperProps } from '../FieldWrapper';
import { CheckboxTreeItem, ItemState } from './type';

export type CheckboxesTreeProps = Omit<FieldWrapperProps, 'children'> & {
  readOnly?: boolean;
  items: CheckboxTreeItem[];
  itemStates: ItemState[];
  onChange?: (newItemStates: ItemState[], item: CheckboxTreeItem) => void;
  computeNewState?: (prevItemState: ItemState[], item: CheckboxTreeItem) => ItemState[];
};

const CheckboxesTree = ({
  items,
  small,
  id,
  label,
  hint,
  statusWithMessage,
  disabled,
  required,
  readOnly,
  itemStates,
  onChange,
  computeNewState,
}: CheckboxesTreeProps) => {
  const defaultComputeNewState = (prevItemState: ItemState[], item: CheckboxTreeItem) => {
    const [parentChildrenMap, childrenParentMap] = buildRelationshipMaps(flattenArray(items));
    return updateItemStatesOptimized(prevItemState, item.id, parentChildrenMap, childrenParentMap);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: CheckboxTreeItem
  ) => {
    const newItemStates = computeNewState
      ? computeNewState(itemStates, item)
      : defaultComputeNewState(itemStates, item);
    onChange?.(newItemStates, item);
    item.props.onClick?.(e);
  };

  return (
    <FieldWrapper
      id={id}
      label={label}
      hint={hint}
      statusWithMessage={statusWithMessage}
      statusIconPosition="before-status-message"
      disabled={disabled}
      required={required}
      small={small}
    >
      <CheckboxList
        small={small}
        items={items}
        disabled={disabled}
        readOnly={readOnly}
        onClickItem={handleClick}
        itemStates={itemStates}
      />
    </FieldWrapper>
  );
};

export default CheckboxesTree;
