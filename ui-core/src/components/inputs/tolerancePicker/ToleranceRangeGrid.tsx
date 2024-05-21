import React from 'react';
import { TOLERANCE_RANGES } from './TolerancePicker';
import cx from 'classnames';

export type ToleranceRangeGridProps = {
  onSelection: (value: number) => void;
  selectedTolerance: number;
  toleranceSign: 'minus' | 'plus';
};

const ToleranceRangeGrid: React.FC<ToleranceRangeGridProps> = ({
  onSelection,
  selectedTolerance,
  toleranceSign,
}) => {
  return (
    <div className="tolerance-picker-section">
      <div className={`tolerance-grid ${toleranceSign}-tolerance`}>
        {TOLERANCE_RANGES.map(({ label, value }, index) => {
          return (
            <button
              key={`${label}-${index}`}
              className={cx('minute', { selected: selectedTolerance === value })}
              style={{ gridArea: `a${index + 1}` }}
              onClick={() => onSelection(value)}
            >
              {`${toleranceSign === 'minus' ? '-' : '+'}${label}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToleranceRangeGrid;
