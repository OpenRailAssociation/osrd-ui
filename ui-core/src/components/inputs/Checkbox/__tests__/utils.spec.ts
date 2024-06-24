import { describe, expect, it } from 'vitest';
import { CheckboxListItem, CheckboxState, CheckboxTreeItem, ItemStates } from '../type';
import {
  buildRelationshipMaps,
  flattenTree,
  updateItemStatesOptimized,
  completeOrInitializeItemStates,
} from '../utils';

describe('utils', () => {
  const buildItemProps = (id: number, checked?: boolean) => ({ label: id.toString(), checked });
  const item2 = { id: 2, props: buildItemProps(2, false) };
  const item4 = { id: 4, props: buildItemProps(4, false) };
  const item3 = { id: 3, props: buildItemProps(3, true), items: [item4] };
  const item1 = { id: 1, props: buildItemProps(1, false), items: [item2, item3] };

  const mockItems: CheckboxTreeItem[] = [item1];
  describe('flattenTree', () => {
    it('should flatten a tree structure into a list', () => {
      const expected: CheckboxListItem[] = [
        { id: 1, props: buildItemProps(1, false) },
        { id: 2, props: buildItemProps(2, false), parentId: 1 },
        { id: 3, props: buildItemProps(3, true), parentId: 1 },
        { id: 4, props: buildItemProps(4, false), parentId: 3 },
      ];
      expect(flattenTree(mockItems)).toEqual(expected);
    });
  });

  describe('buildRelationshipMaps', () => {
    it('should create parent-children and child-parent maps', () => {
      const [parentChildrenMap, childParentMap] = buildRelationshipMaps(mockItems);
      expect(parentChildrenMap).toEqual({ 1: [2, 3], 3: [4] });
      expect(childParentMap).toEqual({ 2: 1, 3: 1, 4: 3 });
    });
  });

  describe('updateItemStatesOptimized', () => {
    let oldState: ItemStates, clickedId: number;
    const [parentChildrenMap, childParentMap] = buildRelationshipMaps(mockItems);

    it('should uncheck a checked item and update related states', () => {
      oldState = {
        1: CheckboxState.UNCHECKED,
        2: CheckboxState.CHECKED,
        3: CheckboxState.CHECKED,
        4: CheckboxState.CHECKED,
      };
      clickedId = 3;
      const newState = updateItemStatesOptimized(
        oldState,
        clickedId,
        parentChildrenMap,
        childParentMap
      );
      expect(newState[3]).toEqual(CheckboxState.UNCHECKED);
      expect(newState[4]).toEqual(CheckboxState.UNCHECKED); // Child should also be unchecked
      expect(newState[1]).toEqual(CheckboxState.INDETERMINATE); // Parent state should be indeterminate
      expect(newState[2]).toEqual(CheckboxState.CHECKED); // Sibling state should not change
    });

    it('should check an unchecked item and update related states', () => {
      oldState = {
        1: CheckboxState.INDETERMINATE,
        2: CheckboxState.CHECKED,
        3: CheckboxState.UNCHECKED,
        4: CheckboxState.UNCHECKED,
      };
      clickedId = 2;
      const newState = updateItemStatesOptimized(
        oldState,
        clickedId,
        parentChildrenMap,
        childParentMap
      );
      expect(newState[1]).toEqual(CheckboxState.UNCHECKED);
      expect(newState[2]).toEqual(CheckboxState.UNCHECKED);
      expect(newState[3]).toEqual(CheckboxState.UNCHECKED);
      expect(newState[4]).toEqual(CheckboxState.UNCHECKED);
    });

    it('should update parent state to checked if all children are checked', () => {
      oldState = {
        1: CheckboxState.INDETERMINATE,
        2: CheckboxState.CHECKED,
        3: CheckboxState.UNCHECKED,
        4: CheckboxState.UNCHECKED,
      };
      clickedId = 3;
      const newState = updateItemStatesOptimized(
        oldState,
        clickedId,
        parentChildrenMap,
        childParentMap
      );
      expect(newState[1]).toEqual(CheckboxState.CHECKED);
      expect(newState[2]).toEqual(CheckboxState.CHECKED);
      expect(newState[3]).toEqual(CheckboxState.CHECKED);
      expect(newState[4]).toEqual(CheckboxState.CHECKED);
    });

    it('should leave parent state indeterminate if at least one child is in a different state', () => {
      oldState = {
        1: CheckboxState.UNCHECKED,
        2: CheckboxState.UNCHECKED,
        3: CheckboxState.UNCHECKED,
        4: CheckboxState.UNCHECKED,
      };
      clickedId = 2;
      const newState = updateItemStatesOptimized(
        oldState,
        clickedId,
        parentChildrenMap,
        childParentMap
      );
      expect(newState[1]).toEqual(CheckboxState.INDETERMINATE);
      expect(newState[2]).toEqual(CheckboxState.CHECKED);
      expect(newState[3]).toEqual(CheckboxState.UNCHECKED);
      expect(newState[4]).toEqual(CheckboxState.UNCHECKED);
    });
  });

  describe('completeOrInitializeItemStates', () => {
    it('initializes states for leaf items correctly', () => {
      const items: CheckboxTreeItem[] = [
        { id: 1, props: buildItemProps(1, true) },
        { id: 2, props: buildItemProps(2) },
      ];
      const nextItemStates = completeOrInitializeItemStates(items);
      expect(nextItemStates).toEqual({ 1: CheckboxState.CHECKED, 2: CheckboxState.UNCHECKED });
    });

    it('computes parent states based on children states', () => {
      const items: CheckboxTreeItem[] = [
        {
          id: 1,
          props: buildItemProps(1),
          items: [
            { id: 11, props: buildItemProps(11, true) },
            { id: 12, props: buildItemProps(12, true) },
          ],
        },
      ];
      const nextItemStates = completeOrInitializeItemStates(items);
      expect(nextItemStates).toEqual({
        1: CheckboxState.CHECKED,
        11: CheckboxState.CHECKED,
        12: CheckboxState.CHECKED,
      });
    });

    it('assigns INDETERMINATE state to parents with mixed children states', () => {
      const items: CheckboxTreeItem[] = [
        {
          id: 1,
          props: buildItemProps(1),
          items: [
            { id: 11, props: buildItemProps(11, true) },
            { id: 12, props: buildItemProps(12, false) },
          ],
        },
      ];
      const nextItemStates = completeOrInitializeItemStates(items);
      expect(nextItemStates).toEqual({
        1: CheckboxState.INDETERMINATE,
        11: CheckboxState.CHECKED,
        12: CheckboxState.UNCHECKED,
      });
    });

    it('handles an empty items array', () => {
      const items: CheckboxTreeItem[] = [];
      const result = completeOrInitializeItemStates(items);
      expect(result).toEqual({});
    });

    it('does not overwrite existing states', () => {
      const items: CheckboxTreeItem[] = [{ id: 1, props: buildItemProps(1) }];
      const existingStates = { 1: CheckboxState.UNCHECKED };
      const nextItemStates = completeOrInitializeItemStates(items, existingStates);
      expect(nextItemStates).toEqual({ 1: CheckboxState.UNCHECKED });
    });
  });
});
