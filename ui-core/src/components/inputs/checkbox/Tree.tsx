import { useState, useCallback } from "react";
import CheckboxList from "./CheckboxList";
import { buildRelationshipMaps, updateItemStatesOptimized } from "./updateItemState";
import { Item } from "./CheckboxList";
import React from "react";

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type ItemState = {
  id: number;
  state: CheckboxState;
};

type rawItem = {
  id: number;
  name: string;
  items?: rawItem[];
};

function flattenArray(items: rawItem[], parentId: number | undefined = undefined, result: Item[] = []) {
  items.forEach((item) => {
    const newItem: Item = { id: item.id, name: item.name };
    if (parentId) {
      newItem.parentId = parentId;
    }
    result.push(newItem);

    if (item.items && item.items.length > 0) {
      flattenArray(item.items, item.id, result);
    }
  });

  return result;
}

const Tree = ({ items, small = false }: { items: rawItem[]; small?: boolean }) => {
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
        updateItemStatesOptimized(currentStates, flatItems, id, parentChildrenMap, childrenParentMap),
      );
    },
    [flatItems, parentChildrenMap, childrenParentMap],
  );

  return (
    <CheckboxList
      small={small}
      items={flatItems}
      onClick={clickHandler}
      getStateForId={(id: number) => itemStates.find((i) => i.id === id)?.state || CheckboxState.UNCHECKED}
    />
  );
};

export default Tree;
