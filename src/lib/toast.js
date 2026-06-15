import { ToastQueue } from "@heroui/react";

// Create a custom queue that bypasses document.startViewTransition.
// The default HeroUI queue wraps updates in startViewTransition + flushSync,
// which conflicts with React 19 concurrent rendering and prevents toasts from
// rendering. Providing a plain wrapUpdate function fixes this.
export const appToastQueue = new ToastQueue({
  wrapUpdate: (fn) => fn(),
});

export const toast = {
  success: (message, options = {}) =>
    appToastQueue.add(
      { title: message, variant: "success", ...options },
      { timeout: 3000 },
    ),
  danger: (message, options = {}) =>
    appToastQueue.add(
      { title: message, variant: "danger", ...options },
      { timeout: 3000 },
    ),
  info: (message, options = {}) =>
    appToastQueue.add(
      { title: message, variant: "accent", ...options },
      { timeout: 3000 },
    ),
  warning: (message, options = {}) =>
    appToastQueue.add(
      { title: message, variant: "warning", ...options },
      { timeout: 3000 },
    ),
};
