import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// @ts-ignore
window.msw = {
  worker,
};
