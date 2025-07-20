import React from "react";

const forward_arrow = ({
  size = 24,
  color = "white",
  className = "",
  ...props
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={`${size}px`}
      viewBox="0 -960 960 960"
      width={`${size}px`}
      fill={`${color}`}>
       <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
</svg>
  );
};

export default forward_arrow;
