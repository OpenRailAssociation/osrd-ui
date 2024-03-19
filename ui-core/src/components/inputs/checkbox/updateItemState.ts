import { Item } from "./CheckboxList";
import { ItemState, CheckboxState } from "./Tree";

type ParentChildrenMap = Record<number, number[]>; // Maps parent ID to child IDs
type ChildParentMap = Record<number, number>; // Maps child ID to parent ID

export const buildRelationshipMaps = (items: Item[]): [ParentChildrenMap, ChildParentMap] => {
  const parentChildrenMap: ParentChildrenMap = {};
  const childParentMap: ChildParentMap = {};

  items.forEach((item) => {
    if (item.parentId !== undefined) {
      if (!parentChildrenMap[item.parentId]) {
        parentChildrenMap[item.parentId] = [];
      }
      parentChildrenMap[item.parentId].push(item.id);

      childParentMap[item.id] = item.parentId;
    }
  });

  return [parentChildrenMap, childParentMap];
};


const updateItemState = (newState: ItemState[], id: number, state: CheckboxState) => {
    const index = newState.findIndex((i) => i.id === id);
    if (index !== -1) {
      newState[index].state = state;
    }
  };
  
  const setCheckedOptimized = (id: number, newState: ItemState[], parentChildrenMap: ParentChildrenMap) => {
    updateItemState(newState, id, CheckboxState.CHECKED);
  
    const children = parentChildrenMap[id];
    if (children) {
      children.forEach((childId) => setCheckedOptimized(childId, newState, parentChildrenMap));
    }
  };
  const setUncheckedOptimized = (id: number, newState: ItemState[], parentChildrenMap: ParentChildrenMap) => {
    updateItemState(newState, id, CheckboxState.UNCHECKED);
  
    const children = parentChildrenMap[id];
    if (children) {
      children.forEach((childId) => setUncheckedOptimized(childId, newState, parentChildrenMap));
    }
  };
  
  const updateParentOptimized = (id: number, newState: ItemState[], parentChildrenMap: ParentChildrenMap, childParentMap: ChildParentMap) => {
    const parentId = childParentMap[id];
    if (parentId === undefined) return;

    const siblings = parentChildrenMap[parentId];
    const siblingStates = siblings.map((siblingId) => (newState.find((i) => i.id === siblingId) as ItemState).state);

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
  
  export const updateItemStatesOptimized = (oldState: ItemState[], items: Item[], clickedId: number , parentChildrenMap: ParentChildrenMap ,childParentMap: ChildParentMap): ItemState[] => {
    const newState = oldState.map(i => ({ ...i }));
  
    const currentItemState = newState.find(i => i.id === clickedId)?.state;
  
    if (currentItemState === CheckboxState.CHECKED) {
      setUncheckedOptimized(clickedId, newState, parentChildrenMap);
    } else {
      setCheckedOptimized(clickedId, newState, parentChildrenMap);
    }
  
    updateParentOptimized(clickedId, newState, parentChildrenMap, childParentMap);
  
    return newState;
  };
