import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { MdList, MdOutlineReportGmailerrorred } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { AuthContext } from '../../../contexts/AuthProvider';
import useRole from '../../../hooks/useRole';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Loader from '../Loader/Loader';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [userRole, userRoleLoading] = useRole(user?.email);

  const sidebarLinkStyles =
    ' text-white hover:bg-white hover:text-main transition-all py-2 pl-3 pr-5 rounded';

  return (
    <aside className="py-8 px-3 bg-main2 w-64">
      <div className="flex items-start flex-col gap-4">
        {userRoleLoading && <Loader></Loader>}

        {userRole === 'user' && (
          <>
            <NavLink
              end
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
              end
              className={({ isActive }) => {
                const activeStyles = isActive && 'bg-white text-main';
                return activeStyles + sidebarLinkStyles;
              }}
              to="/dashboard">
              <div className="flex items-center justify-center gap-2">
                <MdList></MdList> My Products
              </div>
            </NavLink>
            <NavLink
              end
              className={({ isActive }) => {
                const activeStyles = isActive && 'bg-white text-main';
                return activeStyles + sidebarLinkStyles;
              }}
              to="/dashboard/add-product">
              <div className="flex items-center justify-center gap-2">
                <AiOutlineAppstoreAdd></AiOutlineAppstoreAdd> Add Product
              </div>
            </NavLink>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <NavLink
              end
              className={({ isActive }) => {
                const activeStyles = isActive && 'bg-white text-main';
                return activeStyles + sidebarLinkStyles;
              }}
              to="/dashboard">
              <div className="flex items-center justify-center gap-2">
                <FiUsers></FiUsers> All Buyers
              </div>
            </NavLink>
            <NavLink
              end
              className={({ isActive }) => {
                const activeStyles = isActive && 'bg-white text-main';
                return activeStyles + sidebarLinkStyles;
              }}
              to="/dashboard/sellers">
              <div className="flex items-center justify-center gap-2">
                <FiUsers></FiUsers> All Sellers
              </div>
            </NavLink>
            <NavLink
              end
              className={({ isActive }) => {
                const activeStyles = isActive && 'bg-white text-main';
                return activeStyles + sidebarLinkStyles;
              }}
              to="/dashboard/reported">
              <div className="flex items-center justify-center gap-2">
                <MdOutlineReportGmailerrorred></MdOutlineReportGmailerrorred> Reported Items
              </div>
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
