import React from "react";
import { Gear, CheckCircle, Info, Alert, Blocked } from "@osrd-project/ui-icons";

export type Status = "success" | "info" | "error" | "warning" | "loading";

interface InputStatusIconProps {
  status: Status;
  small?: boolean;
}

const InputStatusIcon: React.FC<InputStatusIconProps> = ({ status, small }) => {
  const iconProps = { size: small ? "sm" : "lg" } as const;

  switch (status) {
    case "loading":
      return <Gear {...iconProps} />;
    case "info":
      return <Info {...iconProps} />;
    case "success":
      return <CheckCircle variant="fill" {...iconProps} />;
    case "warning":
      return <Alert variant="fill" {...iconProps} />;
    case "error":
      return <Blocked variant="fill" {...iconProps} />;
    default:
      return null;
  }
};

export default InputStatusIcon;
