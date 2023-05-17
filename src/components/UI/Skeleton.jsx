import React from "react";

const Skeleton = ({ width, height, borderRadius, custom }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        ...custom,
      }}
    ></div>
  );
};

export default Skeleton;
