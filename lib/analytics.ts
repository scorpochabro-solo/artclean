import { YM_ID } from "./constants";

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

function reachGoal(goal: string): void {
  if (typeof window === "undefined" || !YM_ID) return;
  window.ym?.(Number(YM_ID), "reachGoal", goal);
}

export const trackLeadSubmit = () => reachGoal("lead_submit");
export const trackPhoneClick = () => reachGoal("phone_click");

export {};
