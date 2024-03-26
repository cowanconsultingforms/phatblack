import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { menuItemsData } from './menuItemsData';
import './Sidebar.css';
import { IconContext } from 'react-icons';

function Sidebar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem("accessToken"));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='Sidebar'>
            <Link to='#' className='menu-bars'>
              <FaBars onClick={showSidebar} />
            </Link>
        </div>

        <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='Sidebar-toggle'>
              <Link to='#' className='menu-bars' id='menu-close'>
                <AiOutlineClose />
              </Link>
            </li>
              {menuItemsData.map((item, index) => {
                return (
                  <li key={index} className={'nav-text'}>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </li>
              );
            })}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;