import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = ({ menuState }) => {
  return (
    <div
      className={`container ${!menuState && 'hidden'} bg-white p-5 rounded-lg mx-auto py-5  mt-2`}>
      <ul>
        <li className="mb-6">
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

        <li className="mb-6">
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
              className="py-2 transition-all px-5 border-transparent bg-main rounded-full text-white hover:bg-white hover:text-slate-900">
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="py-2 transition-all px-5 border-transparent bg-main rounded-full text-white hover:bg-white hover:text-slate-900">
              Sign Up
            </Link>
          </li>
        </>
      </ul>
    </div>
  );
};

export default Menu;
