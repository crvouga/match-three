//SOURCE: https://stackoverflow.com/questions/56024398/disable-double-tap-zoom-resize-on-safari-ios12

import { useEffect } from "react";

export const useDisableZoom = (element) => {
  useEffect(() => {
    if (!element) {
      return;
    }

    const handleClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleTouch = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    element.addEventListener("click", handleClick);
    element.addEventListener("touchstart", handleTouch, {
      passive: false,
    });
    return () => {
      element.removeEventListener("click", handleClick);
      element.removeEventListener("touchstart", handleTouch);
    };
  }, [element]);
};
