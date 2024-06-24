import {
  CheckboxListItem,
  CheckboxState,
  CheckboxTreeItem,
  ItemStates,
  ParentChildrenMap,
  ChildParentMap,
} from './type';

function traverseTree(
  items: CheckboxTreeItem[],
  onVisit: (item: CheckboxTreeItem, parentId?: number) => void,
  parentId?: number
) {
  items.forEach((item) => {
    onVisit(item, parentId);

    if (item.items && item.items.length > 0) {
      traverseTree(item.items, onVisit, item.id);
    }
  });
}

export function flattenTree(items: CheckboxTreeItem[]): CheckboxListItem[] {
  const flatList: CheckboxListItem[] = [];

  traverseTree(items, (item, parentId) => {
    const { id, props } = item;
    flatList.push({ id, props, parentId });
  });

  return flatList;
}

export const buildRelationshipMaps = (
  items: CheckboxTreeItem[]
): [ParentChildrenMap, ChildParentMap] => {
  const parentChildrenMap: ParentChildrenMap = {};
  const childParentMap: ChildParentMap = {};

  traverseTree(items, (item, parentId) => {
    if (parentId !== undefined) {
      if (!parentChildrenMap[parentId]) {
        parentChildrenMap[parentId] = [];
      }
      parentChildrenMap[parentId].push(item.id);

      childParentMap[item.id] = parentId;
    }
  });

  return [parentChildrenMap, childParentMap];
};

const setCheckboxStateOptimized = (
  id: number,
  newState: ItemStates,
  parentChildrenMap: ParentChildrenMap,
  checkboxState: CheckboxState
) => {
  newState[id] = checkboxState;
  const children = parentChildrenMap[id];
  if (children) {
    children.forEach((childId) =>
      setCheckboxStateOptimized(childId, newState, parentChildrenMap, checkboxState)
    );
  }
};

const updateParentOptimized = (
  id: number,
  newState: ItemStates,
  parentChildrenMap: ParentChildrenMap,
  childParentMap: ChildParentMap
) => {
  const parentId = childParentMap[id];
  if (parentId === undefined) return;

  const siblings = parentChildrenMap[parentId];
  const siblingStates = siblings.map((siblingId) => newState[siblingId]);

  let parentState: CheckboxState;
  if (siblingStates.every((state) => state === CheckboxState.CHECKED)) {
    parentState = CheckboxState.CHECKED;
  } else if (siblingStates.every((state) => state === CheckboxState.UNCHECKED)) {
    parentState = CheckboxState.UNCHECKED;
  } else {
    parentState = CheckboxState.INDETERMINATE;
  }
  newState[parentId] = parentState;
  updateParentOptimized(parentId, newState, parentChildrenMap, childParentMap);
};

export const updateItemStatesOptimized = (
  oldState: ItemStates,
  clickedId: number,
  parentChildrenMap: ParentChildrenMap,
  childParentMap: ChildParentMap
): ItemStates => {
  const newState = { ...oldState };

  const currentItemState = newState[clickedId];
  const newCheckboxState =
    currentItemState === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED;
  setCheckboxStateOptimized(clickedId, newState, parentChildrenMap, newCheckboxState);
  updateParentOptimized(clickedId, newState, parentChildrenMap, childParentMap);

  return newState;
};

export const computeNextItemStates = (
  items: CheckboxTreeItem[],
  clickedItemId: number,
  prevItemState: ItemStates
) => {
  const [parentChildrenMap, childrenParentMap] = buildRelationshipMaps(items);
  return updateItemStatesOptimized(
    prevItemState,
    clickedItemId,
    parentChildrenMap,
    childrenParentMap
  );
};

export function completeOrInitializeItemStates(
  items: CheckboxTreeItem[],
  itemStates: ItemStates = {}
): ItemStates {
  const nextStates = { ...itemStates };
  const [parentChildrenMap] = buildRelationshipMaps(items);

  // Initialize states for leaf items.
  traverseTree(items, (item) => {
    if (item.id in parentChildrenMap) return;
    if (!(item.id in itemStates))
      nextStates[item.id] = item.props.checked ? CheckboxState.CHECKED : CheckboxState.UNCHECKED;
  });

  // Compute states for parent items.
  for (const parentId in parentChildrenMap) {
    const childrenStates = parentChildrenMap[parentId].map((childId) => nextStates[childId]);
    if (childrenStates.every((state) => state === CheckboxState.CHECKED)) {
      nextStates[parentId] = CheckboxState.CHECKED;
    } else if (childrenStates.every((state) => state === CheckboxState.UNCHECKED)) {
      nextStates[parentId] = CheckboxState.UNCHECKED;
    } else {
      nextStates[parentId] = CheckboxState.INDETERMINATE;
    }
  }

  return nextStates;
}
