import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function NavBar() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl)
    });
  }, []);

  const navItems = [
    { name: 'Home', path: '/', description: 'Go to the homepage' },
    { name: 'Create Account', path: '/create-account', description: 'Create a new account' },
    { name: 'Deposit', path: '/deposit', description: 'Deposit money into your account' },
    { name: 'Withdraw', path: '/withdraw', description: 'Withdraw money from your account' },
    { name: 'All Data', path: '/all-data', description: 'View all account data' },
    { name: 'Login', path: '/login', description: 'Login to your account' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">BankApp</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {navItems.map(item => (
            <li className={`nav-item ${location.pathname === item.path ? 'active' : ''}`} key={item.name}>
              <Link
                className="nav-link"
                to={item.path}
                data-toggle="tooltip"
                data-placement="bottom"
                title={item.description}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
