import React from "react";
import { HealodyLogo } from "./HealodyLogo";
import { Info } from "./Info";
import { User } from "./User";
import "./Header.css";

export const Header = ({ className, healodyLogo}) => {
  return (
    <div className={`header ${className}`}>
      <HealodyLogo className={healodyLogo} />
      <div className="help-join">
        <Info className="line-rounded-info" />
        <User className="line-rounded-user" color="#414140" />
      </div>
    </div>
  );
}; 