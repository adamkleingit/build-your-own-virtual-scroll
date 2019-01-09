import React, { memo, useMemo } from "react";

const BLOCK_SIZE = 30;
const BLOCK_PADDING = 50;

const Viewport = ({ children, count, height, childHeight, scrollTop }) => {
  const totalHeight = count * childHeight;
  const visibleNodeCount = useMemo(() => Math.ceil(height / childHeight), [
    height,
    childHeight
  ]);

  let startNode = Math.floor(scrollTop / childHeight) - BLOCK_PADDING;
  startNode = startNode - (startNode % BLOCK_SIZE);
  startNode = Math.max(0, startNode);

  let endNode = startNode + visibleNodeCount + 2 * BLOCK_PADDING;
  endNode = Math.min(count - 1, endNode);

  const translate = startNode * childHeight;

  const visibleChildren = useMemo(
    () => {
      const childrenCount = endNode - startNode;

      return new Array(childrenCount)
        .fill(null)
        .map((_, index) => children({ index: index + startNode }));
    },
    [startNode, endNode]
  );

  return (
    <div
      style={{
        overflow: "hidden",
        willChange: "transform",
        height: totalHeight,
        position: "relative"
      }}
    >
      <div
        style={{
          willChange: "transform",
          transform: `translateY(${translate}px)`
        }}
      >
        {visibleChildren}
      </div>
    </div>
  );
};

export default memo(Viewport);
