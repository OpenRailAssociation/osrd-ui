import React from 'react';

import cx from 'classnames';

import { TOLERANCE_RANGES } from './TolerancePicker';

export type ToleranceRangeGridProps = {
  onSelection: (value: number) => void;
  selectedTolerance: number;
  toleranceSign: 'minus' | 'plus';
};

const ToleranceRangeGrid: React.FC<ToleranceRangeGridProps> = ({
  onSelection,
  selectedTolerance,
  toleranceSign,
}) => (
  <div className="tolerance-picker-section">
    <div className={`tolerance-grid ${toleranceSign}-tolerance`}>
      {TOLERANCE_RANGES.map(({ label, value }, index) => (
        <button
          key={`${label}-${index}`}
          className={cx('minute', { selected: selectedTolerance === value })}
          style={{ gridArea: `a${index + 1}` }}
          onClick={() => onSelection(value)}
        >
          {`${toleranceSign === 'minus' ? '-' : '+'}${label}`}
        </button>
      ))}
    </div>
  </div>
);

export default ToleranceRangeGrid;
