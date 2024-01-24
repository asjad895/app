import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UsersTable from './usersTable';
import Profile from './profile';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [activeLink, setActiveLink] = useState(null);
  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  // only show nav when logged in
  if (!user) return null;
  
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${activeLink === 'dashboard' && 'active'}`}
              to="/dashboard"
              onClick={() => handleNavLinkClick('dashboard')}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${activeLink === 'profile' && 'active'}`}
              to="/dashboard"
              onClick={() => handleNavLinkClick('profile')}
            >
              My Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${activeLink === 'users' && 'active'}`}
              to="/dashboard"
              onClick={() => handleNavLinkClick('users')}
            >
              All Users
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Conditionally render components based on activeLink */}
      {activeLink === 'dashboard' && <h2>Welcome to the Dashboard page</h2>}
      {activeLink === 'profile' && <Profile />}
      {activeLink === 'users' && <UsersTable />}
    </div>
  );
};

export default Dashboard;
