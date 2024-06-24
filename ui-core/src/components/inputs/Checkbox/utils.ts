import {
  CheckboxState,
  CheckboxTreeItem,
  ItemStates,
  ParentChildrenMap,
  ChildParentMap,
} from './type';

/**
 * Traverse a tree of CheckboxTreeItems and call a function on each item.
 * @param items The tree of CheckboxTreeItems
 * @param onVisit A function to call on each item
 * @param parentId The ID of the parent item (if any) of the current item being visited
 */
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

/**
 *  Build parent-children and child-parent maps from a tree of CheckboxTreeItems.
 * @param items The tree of CheckboxTreeItems
 * @returns A tuple containing the parent-children and child-parent maps
 */
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

/**
 * Set the state of an item and all its children to a given state.
 * @param id The ID of the item to set the state for
 * @param newState The new state to set
 * @param parentChildrenMap A map of parent IDs to children IDs
 * @param checkboxState The state to set the item to
 */
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

/**
 * Update the state of a parent item based on the states of its children.
 * @param id The ID of the item to update
 * @param newState The new state of the item
 * @param parentChildrenMap A map of parent IDs to children IDs
 * @param childParentMap A map of child IDs to parent IDs
 * @returns The new state of the parent item
 */
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

/**
 * Update the states of items in a tree based on a clicked item.
 * @param oldState  The previous state of the items
 * @param clickedId The ID of the item that was clicked
 * @param parentChildrenMap A map of parent IDs to children IDs
 * @param childParentMap A map of child IDs to parent IDs
 * @returns The new state of the items
 */
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

/**
 * Compute the next state of items in a tree based on a clicked item.
 * @param items The tree of CheckboxTreeItems
 * @param clickedItemId The ID of the item that was clicked
 * @param prevItemState The previous state of the items
 * @returns The new state of the items
 */
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

/**
 * Complete or initialize the states of items in a tree.
 * @param items The tree of CheckboxTreeItems
 * @param itemStates The states of the items
 * @returns The completed or initialized states of the items
 */
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
