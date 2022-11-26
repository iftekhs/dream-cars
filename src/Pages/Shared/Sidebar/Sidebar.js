import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { MdList, MdOutlineDashboard } from 'react-icons/md';
import { AuthContext } from '../../../contexts/AuthProvider';
import useRole from '../../../hooks/useRole';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [userRole] = useRole(user?.email);

  const sidebarLinkStyles =
    ' text-white hover:bg-white hover:text-main transition-all py-2 pl-3 pr-5 rounded';

  return (
    <aside className="py-8 px-3 bg-main2 w-64">
      <div className="flex items-start flex-col gap-4">
        {userRole === 'user' && (
          <>
            <NavLink
              className={({ isActive }) => {
                const activeStyles = isActive && 'bg-white text-main';
                return activeStyles + sidebarLinkStyles;
              }}
              to="/dashboard">
              <div className="flex items-center justify-center gap-2">
                <MdList></MdList> My Orders
              </div>
            </NavLink>
          </>
        )}

        {userRole === 'seller' && (
          <>
            <NavLink
              className={({ isActive }) => {
                const activeStyles = isActive && 'bg-white text-main';
                return activeStyles + sidebarLinkStyles;
              }}
              to="/dashboard">
              <div className="flex items-center justify-center gap-2">
                <MdList></MdList> My Products
              </div>
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
