import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Avatar from '../../../../images/avatar.svg';

const Menu = ({ menuState }) => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div
      className={`container ${!menuState && 'hidden'} bg-white  p-5 rounded-lg mx-auto py-5  mt-2`}>
      <ul>
        <li className="mb-6">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-1xl header-menu-link active-header-menu-link text-main'
                : 'text-1xl header-menu-link text-main'
            }
            to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-1xl header-menu-link active-header-menu-link text-main'
                : 'text-1xl header-menu-link text-main'
            }
            to="/blogs">
            Blogs
          </NavLink>
        </li>

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
              className="mt-3 py-2 transition-all px-5 border-transparent bg-main rounded-full text-white hover:bg-cgray hover:text-slate-900">
              Log Out
            </button>
          </>
        ) : (
          <>
            <li className="mb-6">
              <Link
                to="/login"
                className="py-2 transition-all px-5 border-transparent bg-main rounded-full text-white hover:bg-cgray hover:text-slate-900">
                Log In
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="py-2 transition-all px-5 border-transparent bg-main rounded-full text-white hover:bg-cgray hover:text-slate-900">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
