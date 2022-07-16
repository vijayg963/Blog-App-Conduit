import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <header>
        <nav>
          <NavLink activeClassName='active' to='/'>
            <strong className='logo'>Conduit</strong>
          </NavLink>
          {props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
        </nav>
      </header>
    </>
  );
}

function NonAuthHeader() {
  return (
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
  );
}

function AuthHeader() {
  return (
    <ul className='navbar'>
      <NavLink activeClassName='active' to='/' exact className='active'>
        <li>Home</li>
      </NavLink>
      <NavLink activeClassName='active' to='/new-post' className='active'>
        <li>New Article</li>
      </NavLink>
      <NavLink activeClassName='active' to='/settings' className='active'>
        <li>Settings</li>
      </NavLink>
      <NavLink activeClassName='active' to='/profile' className='active'>
        <li>Profile</li>
      </NavLink>
    </ul>
  );
}

export default Header;
