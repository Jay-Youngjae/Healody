import React from "react";

export const Info = ({ className }) => {
  return (
    <svg
      className={`info ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M12 22C17.525 22 22 17.525 22 12C22 6.475 17.525 2 12 2C6.475 2 2 6.475 2 12C2 17.525 6.475 22 12 22Z"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        className="path"
        d="M12 17V12"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        className="path"
        d="M12 7.33C11.89 7.33 11.78 7.365 11.69 7.425C11.595 7.485 11.525 7.575 11.48 7.675C11.44 7.78 11.425 7.895 11.45 8C11.47 8.11 11.525 8.21 11.6 8.29C11.68 8.37 11.78 8.425 11.89 8.445C12 8.465 12.115 8.455 12.215 8.41C12.32 8.37 12.405 8.3 12.47 8.205C12.53 8.115 12.565 8.005 12.565 7.895C12.565 7.82 12.55 7.745 12.52 7.675C12.49 7.61 12.45 7.545 12.4 7.495C12.345 7.44 12.285 7.4 12.215 7.375C12.145 7.345 12.075 7.33 12 7.33Z"
        fill="#5D5A88"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};