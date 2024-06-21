import { CheckboxListItem, ItemState, CheckboxState, CheckboxTreeItem } from './type';

type ParentChildrenMap = Record<number, number[]>; // Maps parent ID to child IDs
type ChildParentMap = Record<number, number>; // Maps child ID to parent ID

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

export const buildRelationshipMaps = (
  items: CheckboxTreeItem[]
): [ParentChildrenMap, ChildParentMap] => {
  const parentChildrenMap: ParentChildrenMap = {};
  const childParentMap: ChildParentMap = {};

  const buildMaps = (items: CheckboxTreeItem[], parentId?: number) => {
    items.forEach((item) => {
      if (parentId !== undefined) {
        if (!parentChildrenMap[parentId]) {
          parentChildrenMap[parentId] = [];
        }
        parentChildrenMap[parentId].push(item.id);

        childParentMap[item.id] = parentId;
      }

      if (item.items && item.items.length > 0) {
        buildMaps(item.items, item.id);
      }
    });
  };

  buildMaps(items);

  return [parentChildrenMap, childParentMap];
};

const updateItemState = (newState: ItemState[], id: number, state: CheckboxState) => {
  const index = newState.findIndex((i) => i.id === id);
  if (index !== -1) {
    newState[index].state = state;
  }
};

const setCheckedOptimized = (
  id: number,
  newState: ItemState[],
  parentChildrenMap: ParentChildrenMap
) => {
  updateItemState(newState, id, CheckboxState.CHECKED);

  const children = parentChildrenMap[id];
  if (children) {
    children.forEach((childId) => setCheckedOptimized(childId, newState, parentChildrenMap));
  }
};
const setUncheckedOptimized = (
  id: number,
  newState: ItemState[],
  parentChildrenMap: ParentChildrenMap
) => {
  updateItemState(newState, id, CheckboxState.UNCHECKED);

  const children = parentChildrenMap[id];
  if (children) {
    children.forEach((childId) => setUncheckedOptimized(childId, newState, parentChildrenMap));
  }
};

const updateParentOptimized = (
  id: number,
  newState: ItemState[],
  parentChildrenMap: ParentChildrenMap,
  childParentMap: ChildParentMap
) => {
  const parentId = childParentMap[id];
  if (parentId === undefined) return;

  const siblings = parentChildrenMap[parentId];
  const siblingStates = siblings.map(
    (siblingId) => (newState.find((i) => i.id === siblingId) as ItemState).state
  );

  let parentState: CheckboxState;
  if (siblingStates.every((state) => state === CheckboxState.CHECKED)) {
    parentState = CheckboxState.CHECKED;
  } else if (siblingStates.every((state) => state === CheckboxState.UNCHECKED)) {
    parentState = CheckboxState.UNCHECKED;
  } else {
    parentState = CheckboxState.INDETERMINATE;
  }

  updateItemState(newState, parentId, parentState);
  updateParentOptimized(parentId, newState, parentChildrenMap, childParentMap);
};

export const updateItemStatesOptimized = (
  oldState: ItemState[],
  clickedId: number,
  parentChildrenMap: ParentChildrenMap,
  childParentMap: ChildParentMap
): ItemState[] => {
  const newState = oldState.map((i) => ({ ...i }));

  const currentItemState = newState.find((i) => i.id === clickedId)?.state;

  if (currentItemState === CheckboxState.CHECKED) {
    setUncheckedOptimized(clickedId, newState, parentChildrenMap);
  } else {
    setCheckedOptimized(clickedId, newState, parentChildrenMap);
  }

  updateParentOptimized(clickedId, newState, parentChildrenMap, childParentMap);

  return newState;
};
