import React from "react";

import cx from "classnames";

type checkboxProps = {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onClick?: () => void;
  label: string;
  small?: boolean;
};

const Checkbox: React.FC<checkboxProps> = ({
  isChecked = false,
  isIndeterminate = false,
  onClick = () => {},
  label,
  small,
}) => {
  return (
    <label className={cx("custom-checkbox", { small: small })}>
      <input
        type="checkbox"
        checked={isChecked}
        ref={(input) => input && (input.indeterminate = isIndeterminate)}
        onChange={onClick}
      />
      <span className="checkmark"></span>
      <div className="label">{label}</div>
    </label>
  );
};

export default Checkbox;
