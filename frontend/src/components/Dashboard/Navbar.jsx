import { getToken, removeSessions } from '../../helper/sessionHelper';
import React from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LazyLoader from './LazyLoader';
import './navbar.css'
import Sidebar from './Sidebar';
const Navbar = ({ toggle, isOpen }) => {
  const logout = () => {
    removeSessions()
  }
  const token = getToken()
    return (
      <div>
        <nav className="nav">
          <ul className="nav-title">
            <li>Inventory</li>
            <li>
              <GiHamburgerMenu onClick={toggle} />
            </li>
          </ul>
          <ul className="nav-menu">
            <button onClick={()=>logout()} className='text-white mr-3'>Logout</button>
            
            <Link to="">Profile Pic</Link>
          </ul>
        </nav>

        <div style={{ display: "flex" }}>
          <Sidebar isOpen={isOpen} />
          <Outlet />
        </div>
      </div>
    );
};

export default Navbar;