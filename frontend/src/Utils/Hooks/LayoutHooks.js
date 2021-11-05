import React, {useLayoutEffect, useState} from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const updateSize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return {width, height};
}
