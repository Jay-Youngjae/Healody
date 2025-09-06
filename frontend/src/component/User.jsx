import React from "react";

export const User = ({ className }) => {
  return (
    <svg
      className={`user ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M3.25 22V20.75C3.25 19.6 3.475 18.465 3.915 17.4C4.355 16.34 5 15.375 5.815 14.565C6.625 13.75 7.59 13.105 8.65 12.665C9.715 12.225 10.85 12 12 12C13.15 12 14.285 12.225 15.35 12.665C16.41 13.105 17.375 13.75 18.185 14.565C19 15.375 19.645 16.34 20.085 17.4C20.525 18.465 20.75 19.6 20.75 20.75V22"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        className="path"
        d="M12 12C13.325 12 14.6 11.475 15.535 10.535C16.475 9.6 17 8.325 17 7C17 5.675 16.475 4.4 15.535 3.465C14.6 2.525 13.325 2 12 2C10.675 2 9.4 2.525 8.465 3.465C7.525 4.4 7 5.675 7 7C7 8.325 7.525 9.6 8.465 10.535C9.4 11.475 10.675 12 12 12V12Z"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};