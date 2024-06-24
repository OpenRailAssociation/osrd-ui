import { CheckboxProps } from './Checkbox';

export type CheckboxListItem = {
  id: number;
  parentId?: number; // Make parentId optional for root items
  props: CheckboxProps;
};

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type ItemStates = Record<number, CheckboxState>;

export type CheckboxTreeItem = {
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
};

export type ParentChildrenMap = Record<number, number[]>; // Maps parent ID to child IDs
export type ChildParentMap = Record<number, number>; // Maps child ID to parent ID
