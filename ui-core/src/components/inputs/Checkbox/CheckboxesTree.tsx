import React from 'react';
import CheckboxList from './CheckboxList';
import { buildRelationshipMaps, updateItemStatesOptimized } from './updateItemState';
import FieldWrapper from '../FieldWrapper';
import { StatusWithMessage } from '../StatusMessage';
import { CheckboxListItem, CheckboxTreeItem, ItemState } from './type';

export type CheckboxesTreeProps = {
  id: string;
  label?: string;
  hint?: string;
  statusWithMessage: StatusWithMessage;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  items: CheckboxTreeItem[];
  small?: boolean;
  itemStates: ItemState[];
  onChange?: (newItemStates: ItemState[], item: CheckboxTreeItem) => void;
  computeNewState?: (prevItemState: ItemState[], item: CheckboxTreeItem) => ItemState[];
};

export function flattenArray(
  items: CheckboxTreeItem[],
  parentId: number | undefined = undefined,
  result: CheckboxListItem[] = []
) {
  items.forEach((item) => {
    const newItem: CheckboxListItem = { id: item.id, props: item.props };
    if (parentId != undefined) {
      newItem.parentId = parentId;
    }
    result.push(newItem);

    if (item.items && item.items.length > 0) {
      flattenArray(item.items, item.id, result);
    }
  });

  return result;
}

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
  const flatItems = flattenArray(items);

  const [parentChildrenMap, childrenParentMap] = buildRelationshipMaps(flatItems);

  const handleClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: CheckboxTreeItem
  ) => {
    const newItemStates = computeNewState
      ? computeNewState(itemStates, item)
      : updateItemStatesOptimized(itemStates, item.id, parentChildrenMap, childrenParentMap);
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
