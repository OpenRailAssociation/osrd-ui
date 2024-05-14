import React, { useState, useCallback, useRef } from 'react';
import InputModal from '../Modal';
import Input, { InputProps } from './Input';

const TimePicker: React.FC<InputProps> = (props) => {
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleHourClick = useCallback((hour: string) => {
    setSelectedHour(hour);
  }, []);

  const handleMinuteClick = useCallback((minute: string) => {
    setSelectedMinute(minute);
  }, []);

  const handleMinuteButtonClick = useCallback((action: 'UP' | 'DOWN') => {
    setSelectedMinute((prevMinute) => {
      let newMinute = prevMinute !== null ? parseInt(prevMinute) : 0;
      if (action === 'UP' && newMinute < 59) {
        newMinute++;
      } else if (action === 'DOWN' && newMinute > 0) {
        newMinute--;
      }
      return newMinute.toString().padStart(2, '0');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const [hour, minute] = value.split(':');
    if (hour !== undefined && minute !== undefined) {
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
  };

  const formattedHour = selectedHour.padStart(2, '0');
  const formattedMinute = selectedMinute.padStart(2, '0');
  const selectedTime = `${formattedHour}:${formattedMinute}`;

  const hours = [...Array(24).keys()].map((hour) => hour.toString().padStart(2, '0'));
  const minutes = [...Array(12).keys()].map((minute) => (minute * 5).toString().padStart(2, '0'));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="time-picker">
      <Input
        type="time"
        name="time"
        value={selectedTime}
        onClick={openModal}
        onChange={handleChange}
        ref={inputRef}
        {...props}
      />
      <InputModal inputRef={inputRef} isOpen={isModalOpen} onClose={closeModal}>
        <div className="time-picker-container">
          <div className="time-grid">
            {hours.map((hour) => (
              <div
                key={hour}
                className={`hour ${selectedHour === hour ? 'selected' : ''}`}
                onClick={() => handleHourClick(hour)}
              >
                {hour}
              </div>
            ))}
          </div>

          <div className="time-separator">:</div>

          <div className="minute-container">
            <div className="time-grid">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={`minute ${selectedMinute === minute ? 'selected' : ''}`}
                  onClick={() => handleMinuteClick(minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
            <div className="minute-buttons">
              <button onClick={() => handleMinuteButtonClick('DOWN')} className="minute-button">
                -1mn
              </button>
              <button onClick={() => handleMinuteButtonClick('UP')} className="minute-button">
                +1mn
              </button>
            </div>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default TimePicker;
