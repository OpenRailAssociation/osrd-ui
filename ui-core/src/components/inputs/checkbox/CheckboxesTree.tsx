import React, { useState, useCallback } from 'react';
import CheckboxList from './CheckboxList';
import { buildRelationshipMaps, updateItemStatesOptimized } from './updateItemState';
import FieldWrapper from '../FieldWrapper';
import { statusWithMessage } from '../StatusMessage';
import { checkboxListItem, CheckboxState, checkboxTreeItem, ItemState } from './type';

export type CheckboxesTreeProps = {
  id: string;
  label?: string;
  hint?: string;
  statusWithMessage: statusWithMessage;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  items: checkboxTreeItem[];
  small?: boolean;
};

function flattenArray(
  items: checkboxTreeItem[],
  parentId: number | undefined = undefined,
  result: checkboxListItem[] = []
) {
  items.forEach((item) => {
    const newItem: checkboxListItem = { id: item.id, checkboxProps: item.checkboxProps };
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
}: CheckboxesTreeProps) => {
  const flatItems = flattenArray(items);

  const defaultItemStates: ItemState[] = flatItems.map((i) => ({
    id: i.id,
    state: CheckboxState.UNCHECKED,
  }));

  const [parentChildrenMap, childrenParentMap] = buildRelationshipMaps(flatItems);

  const [itemStates, setItemStates] = useState<ItemState[]>(defaultItemStates);

  const clickHandler = useCallback(
    (id: number) => {
      setItemStates((currentStates) =>
        updateItemStatesOptimized(currentStates, id, parentChildrenMap, childrenParentMap)
      );
    },
    [parentChildrenMap, childrenParentMap]
  );

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
        items={flatItems}
        disabled={disabled}
        readOnly={readOnly}
        onClick={clickHandler}
        getStateForId={(id: number) =>
          itemStates.find((i) => i.id === id)?.state || CheckboxState.UNCHECKED
        }
      />
    </FieldWrapper>
  );
};

export default CheckboxesTree;
