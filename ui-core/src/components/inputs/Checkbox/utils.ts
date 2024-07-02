import { CheckboxState, CheckboxTreeItem } from './type';

const cloneDeep = (items: CheckboxTreeItem[]) =>
  JSON.parse(JSON.stringify(items)) as CheckboxTreeItem[];

const replaceItemInTree = (items: CheckboxTreeItem[], newItem: CheckboxTreeItem) => {
  const newItemIndex = items.findIndex((item) => item.id === newItem.id);
  if (!newItemIndex) return items;

  const newItems = cloneDeep(items);
  newItems.splice(newItemIndex, 1, newItem);
  return newItems;
};

const getItemState = (item: CheckboxTreeItem) => {
  if (item.props.checked) {
    return CheckboxState.CHECKED;
  }
  if (item.props.isIndeterminate) {
    return CheckboxState.INDETERMINATE;
  }
  return CheckboxState.UNCHECKED;
};

const findItemParents = (
  items: CheckboxTreeItem[],
  itemToFind: CheckboxTreeItem
): CheckboxTreeItem[] | undefined => {
  for (const item of items) {
    const children = item.items;
    if (children) {
      const hasItem = children.some((child) => child.id === itemToFind.id);
      if (hasItem) {
        return [item];
      }

      const childrenToItem = findItemParents(children, itemToFind);
      if (childrenToItem) {
        return [...childrenToItem, item];
      }
    }
  }
  return undefined;
};

const updateItemState = (item: CheckboxTreeItem, newState: CheckboxState) => {
  const { checked, isIndeterminate, ...otherProps } = item.props;
  item.props = otherProps;
  if (newState === CheckboxState.INDETERMINATE) item.props.isIndeterminate = true;
  else if (newState === CheckboxState.CHECKED) item.props.checked = true;
  else item.props.checked = false;
};

export const updateItemAndDescendantsStates = (
  item: CheckboxTreeItem,
  newCheckboxState: CheckboxState
) => {
  updateItemState(item, newCheckboxState);
  item.items?.forEach((child) => updateItemAndDescendantsStates(child, newCheckboxState));
};

export const updateAscendantsStates = (
  parents: CheckboxTreeItem[] | undefined,
  childItem: CheckboxTreeItem
): CheckboxTreeItem => {
  if (!parents) return childItem;

  const higherParents = cloneDeep(parents);
  const firstParent = higherParents.shift();
  if (!firstParent?.items) return childItem;

  const children = replaceItemInTree(firstParent.items, childItem);

  const firstChildState = getItemState(children[0]);
  const allChildrenHaveSameState = children.some(
    (child) => getItemState(child) === firstChildState
  );

  const newState = allChildrenHaveSameState ? firstChildState : CheckboxState.INDETERMINATE;
  updateItemState(firstParent, newState);

  return updateAscendantsStates(higherParents, firstParent);
};

export const computeNewItemsTree = (itemsTree: CheckboxTreeItem[], clickedItem: CheckboxTreeItem) => {
  const parents = findItemParents(itemsTree, clickedItem);

  const newState =
    getItemState(clickedItem) === CheckboxState.CHECKED
      ? CheckboxState.UNCHECKED
      : CheckboxState.CHECKED;

  updateItemAndDescendantsStates(clickedItem, newState);
  const updatedHigherParent = updateAscendantsStates(parents, clickedItem);

  return replaceItemInTree(itemsTree, updatedHigherParent);
};
