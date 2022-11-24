import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <h2>Header goes here</h2>
      <main>
        <Outlet></Outlet>
      </main>
      <h2>Footer goes here</h2>
    </>
  );
};

export default Main;
