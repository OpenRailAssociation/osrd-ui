import React from "react";
import cx from "classnames";
import { status } from "./InputV1";

export type StatusMessageProps = {
  status: status;
  message?: string;
};

const StatusMessage: React.FC<StatusMessageProps> = ({ status, message }) => {
  return <span className={cx("base-status-message", { [status]: status })}>{message}</span>;
};

export default StatusMessage;
