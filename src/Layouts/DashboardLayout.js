import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header/Header';
import Sidebar from '../Pages/Shared/Sidebar/Sidebar';

const DashboardLayout = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <Sidebar></Sidebar>
        <main className="mh-100 w-full bg-clp">
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
