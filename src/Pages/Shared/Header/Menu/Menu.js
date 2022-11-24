import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = ({ menuState }) => {
  return (
    <div
      className={`container ${!menuState && 'hidden'} bg-cdark p-5 rounded-lg mx-auto py-3  mt-2`}>
      <ul>
        <li className="mb-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-1xl header-link font-semibold active-header-link'
                : 'text-1xl header-link font-semibold'
            }
            to="/services">
            Services
          </NavLink>
        </li>

        <li className="mb-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-1xl header-link font-semibold active-header-link'
                : 'text-1xl header-link font-semibold'
            }
            to="/blog">
            Blog
          </NavLink>
        </li>

        <>
          <li className="mb-6">
            <Link
              to="/login"
              className="btn border border-white text-white hover:bg-white hover:text-cdark">
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="btn border border-white text-white hover:bg-white hover:text-cdark">
              Sign Up
            </Link>
          </li>
        </>
      </ul>
    </div>
  );
};

export default Menu;
