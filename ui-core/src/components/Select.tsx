import React from "react";

export type SelectOption = { value: string; label: string };

export type SelectProps = {
  label: string;
  hint: string;
  placeholder: string;
  options: SelectOption[];
};

const Select: React.FC<SelectProps> = ({ label, hint, options, placeholder }) => {
  return (
    <div>
      <label>{label}</label>
      <p>{hint}</p>
      <select>
        {placeholder && <option value="">{`–${placeholder}–`}</option>}
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
