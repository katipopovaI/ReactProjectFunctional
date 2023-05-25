import { Link, NavLink } from "react-router-dom";

import "./appHeader.scss";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        {/* <a href="#"> */}
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
        {/* </a> */}
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            {/* <a href="#">Characters</a> */}
            <NavLink exact activeStyle={{ color: "#9f0013" }} to="/">
              Characters
            </NavLink>
          </li>
          /
          <li>
            {/* <a href="#">Comics</a> */}
            <NavLink activeStyle={{ color: "#9f0013" }} to="/comics">
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
