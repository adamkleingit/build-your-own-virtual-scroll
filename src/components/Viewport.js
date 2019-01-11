import React, { memo, useMemo } from "react";

const RENDER_AHEAD = 10;

const Viewport = ({ renderItem, count, height, childHeight, scrollTop }) => {
  const totalHeight = count * childHeight;

  let startNode = Math.floor(scrollTop / childHeight) - RENDER_AHEAD;
  startNode = Math.max(0, startNode);

  const visibleNodeCount = Math.ceil(height / childHeight) + 2 * RENDER_AHEAD;
  let endNode = startNode + visibleNodeCount;
  endNode = Math.min(count - 1, endNode);

  const offsetY = startNode * childHeight + 1;

  const childrenCount = endNode - startNode;

  const visibleChildren = new Array(childrenCount)
    .fill(null)
    .map((_, index) => renderItem({ index: index + startNode }));

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
          transform: `translateY(${offsetY}px)`
        }}
      >
        {visibleChildren}
      </div>
    </div>
  );
};

export default memo(Viewport);
