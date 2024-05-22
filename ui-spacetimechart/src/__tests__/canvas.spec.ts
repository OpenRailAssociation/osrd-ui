import { describe, expect, it } from 'vitest';

import { getAliasedDiscShape } from '../utils/canvas';

describe('getAliasedDiscShape', () => {
  it('should return return the expected flat matrices', () => {
    expect(getAliasedDiscShape(0)).toEqual(new Uint8Array([1]));
    expect(getAliasedDiscShape(1)).toEqual(new Uint8Array([0, 1, 0, 1, 1, 1, 0, 1, 0]));
    expect(getAliasedDiscShape(2)).toEqual(
      new Uint8Array([0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0])
    );
  });
});
