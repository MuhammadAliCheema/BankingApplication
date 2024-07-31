import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Create Account', path: '/create-account' },
    { name: 'Deposit', path: '/deposit' },
    { name: 'Withdraw', path: '/withdraw' },
    { name: 'All Data', path: '/all-data' },
    { name: 'Login', path: '/login' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">The Bank App</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {navItems.map(item => (
            <li className={`nav-item ${location.pathname === item.path ? 'active' : ''}`} key={item.name}>
              <Link className="nav-link" to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
