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
 <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
</svg>
  );
};

export default forward_arrow;
