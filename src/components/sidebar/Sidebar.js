import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    fetch("/categories").then((response) =>
      response
        .json()
        .then((postInfo) => {
          console.log("asdsadsad");
          console.log(postInfo);
          setCats(postInfo);
        })
        .catch((err) => console.log(err))
    );
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto,
          blanditiis.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="siidebarList">
          {cats.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="topIcon fa-brands fa-facebook"></i>
          <i className="topIcon fa-brands fa-facebook"></i>
          <i className="topIcon fa-brands fa-facebook"></i>
          <i className="topIcon fa-brands fa-facebook"></i>
        </div>
      </div>
    </div>
  );
}
