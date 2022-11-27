import React, { useContext, useState } from 'react';
import { GoThreeBars } from 'react-icons/go';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import './Header.css';
import Menu from './Menu/Menu';
import Avatar from '../../../images/avatar.svg';
import Logo from '../../../images/logo.svg';

const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const headerAbsoluteRoutes = ['/'];
  const isAbsolute = headerAbsoluteRoutes.includes(location.pathname);

  return (
    <header
      className={`header ${isAbsolute ? 'absolute w-full top-0' : 'bg-main text-white'} p-5 py-6`}>
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="logo-container flex items-center justify-center gap-1">
            <img className="h-10 rounded-full" src={Logo} alt="" />
            <h4 className="text-2xl md:text-4xl font-bold">DreamCars</h4>
          </div>
        </Link>

        <div className="hidden lg:flex gap-4 items-center justify-center">
          {user && user.uid && (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-1xl header-link active-header-link' : 'text-1xl header-link'
              }
              to="/dashboard">
              Dashboard
            </NavLink>
          )}

          <NavLink
            className={({ isActive }) =>
              isActive ? 'text-1xl header-link  active-header-link' : 'text-1xl header-link'
            }
            to="/blogs">
            Blogs
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center justify-center gap-2">
          {user && user.uid ? (
            <>
              <div>
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = Avatar;
                    }}
                    src={user.photoURL ? user.photoURL : Avatar}
                    alt="user"
                    height="60"
                  />
                </div>
              </div>
              <button
                onClick={() => logOut()}
                className={`${
                  !isAbsolute ? 'bg-white text-dark' : 'bg-main'
                } py-2 transition-all px-5 border-transparent rounded-full text-white hover:bg-white hover:text-slate-900`}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${
                  !isAbsolute ? 'bg-white text-dark' : 'bg-main'
                } py-2 transition-all px-5 border-transparent rounded-full text-white hover:bg-white hover:text-slate-900`}>
                Log In
              </Link>
              <Link
                to="/signup"
                className={`${
                  !isAbsolute ? 'bg-white text-dark' : 'bg-main'
                } py-2 transition-all px-5 border-transparent rounded-full text-white hover:bg-white hover:text-slate-900`}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className={`btn ${
            menuState && 'bg-cgray text-main'
          } block lg:hidden btn-burger text-3xl hover:bg-cgray hover:text-main`}>
          <GoThreeBars></GoThreeBars>
        </button>
      </nav>
      <Menu menuState={menuState}></Menu>
    </header>
  );
};

export default Header;
