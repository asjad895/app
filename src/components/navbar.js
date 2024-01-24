import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="active">
              All Users
            </NavLink>
          </li>
          </ul>
      </nav>
    </div>);

};

export default Navbar;
