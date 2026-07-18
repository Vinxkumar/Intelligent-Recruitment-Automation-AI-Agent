// import * as React from "react";

const Logo = ({ size = 40, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={150} cy={150} r={140} fill="" />
    <line
      x1={116}
      y1={110}
      x2={150}
      y2={198}
      stroke="#ffffff"
      strokeWidth={35}
      strokeLinecap="round"
    />
    <line
      x1={184}
      y1={110}
      x2={150}
      y2={198}
      stroke="#ffffff"
      strokeWidth={35}
      strokeLinecap="round"
    />
    <line
      x1={184}
      y1={110}
      x2={203}
      y2={128}
      stroke="#ffffff"
      strokeWidth={35}
      strokeLinecap="round"
    />
  </svg>
);

export default Logo;