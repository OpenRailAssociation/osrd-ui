type status = "success" | "info" | "error" | "warning" | "loading";

export type statusWithMessage = {
  status: status;
  message?: string;
};
