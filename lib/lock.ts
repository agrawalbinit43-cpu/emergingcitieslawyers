/** While a dialog is open, everything else on the page is inert, which keeps keyboard focus inside it. */
export function lockPage(keep: Element | null, on: boolean) {
  for (const el of Array.from(document.body.children)) {
    if (el !== keep && el.tagName !== "SCRIPT") (el as HTMLElement).inert = on;
  }
  document.body.style.overflow = on ? "hidden" : "";
}

export const AGREED_KEY = "ecl-disclaimer-agreed";
export const AGREED_EVENT = "ecl:agreed";
export const MENU_EVENT = "ecl:menu";

export function hasAgreed() {
  try {
    return !!localStorage.getItem(AGREED_KEY);
  } catch {
    return false;
  }
}
