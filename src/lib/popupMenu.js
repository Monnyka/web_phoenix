import { useLayoutEffect } from "react";

const MENU_GAP = 8; // space between the trigger button and the menu
const EDGE_PADDING = 8; // minimum distance from the viewport edges

// Keeps portal-based popup menus inside the viewport so they stay tappable.
// Runs right before the browser paints (useLayoutEffect), so the menu never
// flashes off-screen. It measures the rendered menu, then positions it with
// `position: fixed`:
// - vertically: opens below the trigger, but flips above when the button is in
//   the lower half of the screen (or there isn't enough room below)
// - horizontally: right edge aligned with the trigger button's right edge (the
//   popup extends to the left), clamped inside the viewport
export function useMenuInViewport(menuRef, areaRef, isOpen) {
  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    const menuEl = menuRef.current;
    const areaEl = areaRef.current;
    if (!menuEl || !areaEl) return undefined;

    // Take the menu out of document flow FIRST so its measured width is the
    // shrink-to-fit (content) width, not the full body width it gets while
    // statically positioned inside the portal. useLayoutEffect runs before
    // paint, so the user never sees it at this temporary spot.
    menuEl.style.position = "fixed";

    const menuRect = menuEl.getBoundingClientRect();
    const areaRect = areaEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - areaRect.bottom;
    const buttonCenterY = (areaRect.top + areaRect.bottom) / 2;
    const openAbove =
      spaceBelow < menuRect.height + MENU_GAP || buttonCenterY > viewportHeight / 2;

    let top = openAbove
      ? areaRect.top - menuRect.height - MENU_GAP
      : areaRect.bottom + MENU_GAP;
    const maxTop = Math.max(
      EDGE_PADDING,
      viewportHeight - menuRect.height - EDGE_PADDING,
    );
    top = Math.min(Math.max(top, EDGE_PADDING), maxTop);

    // Align the popup's right edge with the button's right edge (it extends
    // to the left), then clamp so it never goes off the left/right edges.
    let left = areaRect.right - menuRect.width;
    const maxLeft = Math.max(
      EDGE_PADDING,
      viewportWidth - menuRect.width - EDGE_PADDING,
    );
    left = Math.min(Math.max(left, EDGE_PADDING), maxLeft);

    menuEl.style.top = `${top}px`;
    menuEl.style.left = `${left}px`;
    menuEl.style.right = "auto";
  }, [isOpen, menuRef, areaRef]);
}
