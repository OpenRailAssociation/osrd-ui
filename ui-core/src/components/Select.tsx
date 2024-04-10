import React from 'react';
import FieldWrapper, { FieldWrapperProps } from './inputs/FieldWrapper';
import cx from 'classnames';

export type SelectOption = { value: string; label: string };

export type SelectProps = React.InputHTMLAttributes<HTMLSelectElement> &
  FieldWrapperProps & {
    placeholder: string;
    options: SelectOption[];
    initialSelected?: string;
  };

const PLACEHOLDER_OPTION_VALUE = '';

// TODO
// Faut-il changer l'icone d'ouverture de la pop-up des options ?
// Quel couleur pour les options lorsqu'on affiche la liste ? Gris pour le placeholder et noir pour les autres ?
// Checker le style du select avec Thibaut surtout le fait qu'il y ait plusieurs valeurs de border
// y a pas d'état success pour les selects ?
// background-color: utiliser tailwindcss
// pourquoi l'icon du status info est black et pas blue  en variant fill?

const Select: React.FC<SelectProps> = ({
  id,
  label,
  hint,
  options,
  placeholder,
  statusWithMessage,
  initialSelected = PLACEHOLDER_OPTION_VALUE,
  required,
  disabled,
  readOnly,
  small,
}) => {
  const [selected, setSelected] = React.useState(initialSelected);

  if (
    initialSelected &&
    initialSelected != PLACEHOLDER_OPTION_VALUE &&
    !options.some((option) => option.value === initialSelected)
  ) {
    console.warn(`initial value "${initialSelected}" does not match any option`);
  }

  return (
    <FieldWrapper
      id={id}
      label={label}
      hint={hint}
      statusWithMessage={statusWithMessage}
      required={required}
      disabled={disabled}
      small={small}
    >
      <select
        className={cx('custom-select', {
          'placeholder-selected': selected === PLACEHOLDER_OPTION_VALUE,
          small,
          'read-only': readOnly,
          [statusWithMessage?.status || '']: !!statusWithMessage,
        })}
        required={required}
        value={selected}
        disabled={disabled || readOnly}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value={PLACEHOLDER_OPTION_VALUE}>{`– ${placeholder} –`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default Select;
