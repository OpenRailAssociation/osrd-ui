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

export type ItemState = {
  id: number;
  state: CheckboxState;
};

export type CheckboxTreeItem = {
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
};
