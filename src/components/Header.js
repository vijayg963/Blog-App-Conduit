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
      <NavLink activeClassName='active' to='/' exact>
        <li>Home</li>
      </NavLink>
      <NavLink activeClassName='active' to='/signup'>
        <li>Sign Up</li>
      </NavLink>
      <NavLink activeClassName='active' to='/login'>
        <li>Sign In</li>
      </NavLink>
    </ul>
  );
}

function AuthHeader() {
  return (
    <ul className='navbar'>
      <NavLink activeClassName='active' to='/' exact>
        <li>Home</li>
      </NavLink>
      <NavLink activeClassName='active' to='/new-post'>
        <li>New Article</li>
      </NavLink>
      <NavLink activeClassName='active' to='/settings'>
        <li>Settings</li>
      </NavLink>
      <NavLink activeClassName='active' to='/profile'>
        <li>Profile</li>
      </NavLink>
    </ul>
  );
}

export default Header;
