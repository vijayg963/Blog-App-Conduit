import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <nav>
          <NavLink activeClassName='active' to='/'>
            <strong className='logo'>Conduit</strong>
          </NavLink>
          <ul className='navbar'>
            <NavLink activeClassName='active' to='/' exact className='active'>
              <li>Home</li>
            </NavLink>
            <NavLink activeClassName='active' to='/signup' className='active'>
              <li>Sign Up</li>
            </NavLink>
            <NavLink activeClassName='active' to='/login' className='active'>
              <li>Sign In</li>
            </NavLink>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
