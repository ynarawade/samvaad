import { os } from "@orpc/server";

export const base = os.$context<{ request: Request }>().errors({
  RATE_LIMITED: {
    message: "Rate limit exceeded. Please try again later.",
  },
  BAD_REQUEST: {
    message: "Invalid request. Please check your input and try again.",
  },
  NOT_FOUND: {
    message: "The requested resource could not be found.",
  },
  FORBIDDEN: {
    message: "You do not have permission to access this resource.",
  },
  UNAUTHORIZED: {
    message: "Authentication required. Please log in to continue.",
  },
  INTERNAL_SERVER_ERROR: {
    message: "An unexpected error occurred. Please try again later.",
  },
});
