import React, {
  useState,
  useRef,
  useEffect,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type ReactNode,
  type FocusEventHandler,
  useMemo,
} from 'react';

import { ChevronDown, X } from '@osrd-project/ui-icons';
import cx from 'classnames';

import { normalizeString } from './utils';
import Input, { type InputProps } from '../Input';

interface InputWithSuggestionsProps<T> extends Omit<InputProps, 'onChange' | 'value'> {
  suggestions: Array<T>;
  onChange: (value: T) => void;
  getSuggestionLabel: (option: T) => string;
  customLabel?: ReactNode;
  numberOfSuggestionsToShow?: number;
  exactSearch?: boolean;
  value?: T;
}

const InputWithSuggestions = <T,>({
  suggestions,
  onChange,
  getSuggestionLabel,
  customLabel,
  numberOfSuggestionsToShow = 5,
  exactSearch = false,
  value,
  small,
  ...inputProps
}: InputWithSuggestionsProps<T>) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value ? getSuggestionLabel(value) : '');
  const inputRef = useRef<HTMLInputElement>(null);

  const sortedSuggestions = useMemo(
    () => suggestions.sort((a, b) => getSuggestionLabel(a).localeCompare(getSuggestionLabel(b))),
    [suggestions, getSuggestionLabel]
  );

  const showSuggestions = filteredSuggestions.length > 0;

  const focusInput = () => inputRef.current?.focus();

  const clearInput = () => {
    setInputValue('');
    inputRef.current?.focus();
  };

  const icons = [
    ...(inputValue
      ? [
          {
            icon: <X size={small ? 'sm' : 'lg'} />,
            action: clearInput,
            className: 'clear-icon',
          },
        ]
      : []), // Conditionally include the clear icon only when inputValue is not empty
    ...(sortedSuggestions.length > 0
      ? [
          {
            icon: <ChevronDown size={small ? 'sm' : 'lg'} />,
            action: focusInput,
            className: 'chevron-icon',
          },
        ]
      : []), // Conditionally include the chevron icon only when suggestions are not empty
  ];

  useEffect(() => {
    if (value) {
      setInputValue(getSuggestionLabel(value));
    }
  }, [value, getSuggestionLabel]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const userInput = normalizeString(e.currentTarget.value).trim();
    setInputValue(e.currentTarget.value);

    if (userInput.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = sortedSuggestions.filter((suggestion) => {
      const suggestionLabel = normalizeString(getSuggestionLabel(suggestion).toLowerCase());
      return exactSearch
        ? suggestionLabel.startsWith(userInput.toLowerCase())
        : suggestionLabel.includes(userInput.toLowerCase());
    });
    setFilteredSuggestions(filtered);
  };

  const selectSuggestion = (index: number) => {
    const selectedSuggestion = filteredSuggestions[index];
    setInputValue(getSuggestionLabel(selectedSuggestion));
    onChange(selectedSuggestion);
    setFilteredSuggestions([]);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestionIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if ((e.key === 'Enter' || e.key === 'Tab') && activeSuggestionIndex >= 0) {
      selectSuggestion(activeSuggestionIndex);
    } else if (e.key === 'Escape') {
      setFilteredSuggestions([]);
    }
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (inputRef.current && inputRef.current.value === '') {
      setFilteredSuggestions(sortedSuggestions);
    }
  };

  const handleParentDivOnBlur: FocusEventHandler<HTMLInputElement> = () => {
    if (filteredSuggestions.length === 1) {
      selectSuggestion(0);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (index: number) => {
    selectSuggestion(index);
  };

  return (
    <div
      className="input-with-suggestions"
      style={{ '--number-of-suggestions': numberOfSuggestionsToShow } as React.CSSProperties}
      onBlur={handleParentDivOnBlur}
    >
      {customLabel && <label htmlFor={inputProps.id}>{customLabel}</label>}
      <Input
        {...inputProps}
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        withIcons={icons}
        small={small}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={`${getSuggestionLabel(suggestion)}-${index}`}
              className={cx('suggestion-item', {
                active: index === activeSuggestionIndex,
                small,
              })}
              onClick={() => handleSuggestionClick(index)}
              onMouseDown={(e) => e.preventDefault()} // Prevents the div parent (.input-with-suggestions) from losing focus
            >
              {getSuggestionLabel(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputWithSuggestions;
