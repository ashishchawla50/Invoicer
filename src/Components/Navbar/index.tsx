import React from "react";
import { Link } from "react-router-dom";
import { NavData } from "./NavData";

export const Navbar = () => {
  const [sidebar, setSidebar] = React.useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <nav className={"nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          {NavData.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
