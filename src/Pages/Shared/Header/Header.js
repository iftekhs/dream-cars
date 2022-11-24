import React, { useState } from 'react';
import { GoThreeBars } from 'react-icons/go';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import Menu from './Menu/Menu';

const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const headerAbsoluteRoutes = ['/'];
  const shouldBeAbsolute = headerAbsoluteRoutes.includes(location.pathname);

  return (
    <header className={`header ${shouldBeAbsolute && 'absolute w-full top-0'} p-5 py-6`}>
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="logo-container flex items-center justify-center gap-1">
            {/* <img className="logo" src="" alt="" /> */}
            <h4 className="text-2xl md:text-4xl font-bold">DreamCars</h4>
          </div>
        </Link>

        <div className="hidden lg:flex gap-4 items-center justify-center">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'text-1xl header-link  active-header-link' : 'text-1xl header-link '
            }
            to="/services">
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'text-1xl header-link  active-header-link' : 'text-1xl header-link '
            }
            to="/blog">
            Blog
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center justify-center gap-2">
          <>
            <Link
              to="/login"
              className="py-2 transition-all px-5 border-transparent bg-main rounded-full text-white hover:bg-white hover:text-slate-900">
              Log In
            </Link>
            <Link
              to="/register"
              className="py-2 transition-all px-5 border-transparent bg-main rounded-full text-white hover:bg-white hover:text-slate-900">
              Sign Up
            </Link>
          </>
        </div>

        <button
          onClick={toggleMenu}
          className={`btn ${
            menuState && 'bg-cgray text-cdark'
          } block lg:hidden btn-burger text-3xl hover:bg-cgray hover:text-cdark`}>
          <GoThreeBars></GoThreeBars>
        </button>
      </nav>
      <Menu menuState={menuState}></Menu>
    </header>
  );
};

export default Header;
