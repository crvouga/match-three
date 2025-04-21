import { useLayoutEffect, useState } from "react";

export const useSize = (ref) => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    if (ref.current) {
      const updateSize = () => {
        setSize([ref.current.offsetWidth, ref.current.offsetHeight]);
      };

      window.addEventListener("resize", updateSize);

      updateSize();

      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, [ref]);

  return size;
};
