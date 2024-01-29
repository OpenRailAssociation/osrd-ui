import { checkboxProps } from './Checkbox';

export type checkboxListItem = {
  id: number;
  parentId?: number; // Make parentId optional for root items
  checkboxProps: checkboxProps;
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
  checkboxProps: checkboxProps;
  items?: checkboxTreeItem[];
};
