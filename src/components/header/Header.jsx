import React from "react";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitlesSm">React & Node</span>
        <span className="headerTitlesLg"> Blog </span>
      </div>
      <img
        className="headerImg"
        src="https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png"
        alt=""
      />
    </div>
  );
}
