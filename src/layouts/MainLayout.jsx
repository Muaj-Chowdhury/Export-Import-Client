import React from 'react';

import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className=" ">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;