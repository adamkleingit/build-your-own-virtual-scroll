import React, { useState, useRef, useEffect, memo } from "react";
import { throttle } from "lodash/fp";

const ScrollAware = ({ children, height }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef(null);

  const onScroll = e =>
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  useEffect(() => {
    const scrollContainer = ref.current; //getScrollParent(ref.current);

    setScrollTop(scrollContainer.scrollTop);
    scrollContainer.addEventListener("scroll", onScroll);
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ height, overflow: "auto" }} ref={ref}>
      {children({ scrollTop, height })}
    </div>
  );
};

function getScrollParent(node) {
  if (node === null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
}

export default memo(ScrollAware);
