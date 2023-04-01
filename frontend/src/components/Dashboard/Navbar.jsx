import React, { Suspense } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link, Outlet } from 'react-router-dom';
import LazyLoader from './LazyLoader';
import './navbar.css'
import Sidebar from './Sidebar';
const Navbar = ({toggle, isOpen}) => {
    return (
      <div>
        <nav className="nav">
          <ul className="nav-title">
            <li>Task</li>
            <li>
              <GiHamburgerMenu onClick={toggle} />
            </li>
          </ul>
          <ul className="nav-menu">
            <Link to="">Login</Link>
            <Link to="">Profile Pic</Link>
          </ul>
        </nav>

        <div style={{display:"flex"}}>
          <Sidebar style={{ height: "100%" }} isOpen={isOpen} />
          <Outlet />
        </div>
      </div>
    );
};

export default Navbar;