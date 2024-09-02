/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';

import ToleranceRangeGrid from './ToleranceRangeGrid';
import Modal from '../../Modal';
import Input, { type InputProps } from '../Input';
import { type StatusWithMessage } from '../StatusMessage';

export const TOLERANCE_RANGES = [
  { label: '00', value: 0 },
  { label: '05', value: 300 },
  { label: '10', value: 600 },
  { label: '15', value: 900 },
  { label: '20', value: 1200 },
  { label: '25', value: 1500 },
  { label: '30', value: 1800 },
  { label: '35', value: 2100 },
  { label: '40', value: 2400 },
  { label: '45', value: 2700 },
  { label: '1h00', value: 3600 },
  { label: '1h15', value: 4500 },
  { label: '1h30', value: 5400 },
  { label: '1h45', value: 6300 },
  { label: '2h00', value: 7200 },
  { label: '2h30', value: 9000 },
  { label: '3h00', value: 10800 },
  { label: '3h30', value: 12600 },
  { label: '4h00', value: 14400 },
];

export type ToleranceValues = {
  minusTolerance: number;
  plusTolerance: number;
};

export type TolerancePickerProps = Omit<InputProps, 'value'> & {
  onToleranceChange: (toleranceValues: ToleranceValues) => void;
  toleranceValues?: ToleranceValues;
  translateWarningMessage?: (invalidTolerance: number) => string;
};

const TolerancePicker = ({
  onToleranceChange,
  toleranceValues: { minusTolerance, plusTolerance } = {
    minusTolerance: TOLERANCE_RANGES[0].value,
    plusTolerance: TOLERANCE_RANGES[0].value,
  },
  translateWarningMessage,
  ...inputProps
}: TolerancePickerProps) => {
  const formatToleranceValue = (minusIndex: number, plusIndex: number) =>
    `-${TOLERANCE_RANGES[minusIndex]?.label || ''}/+${TOLERANCE_RANGES[plusIndex]?.label || ''}`;

  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState(formatToleranceValue(0, 0));
  const [warningStatus, setWarningStatus] = useState<StatusWithMessage | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const minusToleranceIndex = TOLERANCE_RANGES.findIndex(
      (range) => range.value === minusTolerance
    );
    const plusToleranceIndex = TOLERANCE_RANGES.findIndex((range) => range.value === plusTolerance);
    if (minusToleranceIndex < 0 || plusToleranceIndex < 0) {
      const invalidTolerance = minusToleranceIndex < 0 ? minusTolerance : plusTolerance;
      setWarningStatus({
        status: 'warning',
        message:
          translateWarningMessage?.(invalidTolerance) ||
          `${invalidTolerance} is not a valid tolerance value.`,
      });
    } else {
      setWarningStatus(undefined);
    }

    setInputValue(formatToleranceValue(minusToleranceIndex, plusToleranceIndex));
  }, [minusTolerance, plusTolerance]);

  return (
    <div className="tolerance-picker">
      <div>
        <Input
          {...inputProps}
          value={inputValue}
          statusWithMessage={warningStatus}
          onClick={() => setShowPicker(!showPicker)}
          type="text"
          ref={inputRef}
        />
      </div>

      <Modal inputRef={inputRef} isOpen={showPicker} onClose={() => setShowPicker(false)}>
        <div className="time-tolerance">
          <ToleranceRangeGrid
            onSelection={(e) => onToleranceChange({ minusTolerance: e, plusTolerance })}
            selectedTolerance={minusTolerance}
            toleranceSign="minus"
          />

          <div className="divider" />

          <ToleranceRangeGrid
            onSelection={(e) => onToleranceChange({ minusTolerance, plusTolerance: e })}
            selectedTolerance={plusTolerance}
            toleranceSign="plus"
          />
        </div>
      </Modal>
    </div>
  );
};

export default TolerancePicker;
