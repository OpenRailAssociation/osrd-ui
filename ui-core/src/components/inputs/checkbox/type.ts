import { CheckboxProps } from './Checkbox';

export type checkboxListItem = {
  id: number;
  parentId?: number; // Make parentId optional for root items
  checkboxProps: CheckboxProps;
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

export type checkboxTreeItem = {
  id: number;
  checkboxProps: CheckboxProps;
  items?: checkboxTreeItem[];
};
