import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuItemsData } from './menuItemsData';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import { FaBars } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { PiTelevisionSimple } from "react-icons/pi";
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineSignal } from "react-icons/hi2";
import { SiApplearcade } from "react-icons/si";
import { LuMic2 } from "react-icons/lu";
import { GiSmartphone } from "react-icons/gi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { GiAmpleDress } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiUsersThreeLight } from "react-icons/pi";
import { LuMessagesSquare } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosInformationCircle } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import PBPremiumLogo from "../../assets/PHATBLACK.png"

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
            <div className='SidebarIcons'>
              <ul>
                <li><PiTelevisionSimple /></li>
                <li><HiOutlineSignal /></li>
                <li><FaBookBookmark /></li>
                <li><FaRegCalendarCheck /></li>
                <li><HiShoppingBag /></li>
                <li><LuMic2 /></li>
                <li><SiApplearcade /></li>
                <li><GiSmartphone /></li>
                <li><GiAmpleDress /></li>
                <li><IoMusicalNotesOutline/></li>
                <li><PiUsersThreeLight /></li>
                <li><LuMessagesSquare /></li>
                <li><IoIosInformationCircle /></li>
                <li><CiMail /></li>
                <li><FaQuestionCircle /></li>
                <li><BiSolidPhoneCall /></li>
              </ul>
            </div>
        </div>

        <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div className='SidebarIconsv2'>
            <Link to='#' className='close'>
              <FaBars onClick={showSidebar} />
            </Link>

            <Link to="/" >
              <img className="Sidebarlogo" src={PBPremiumLogo} alt="PhatBlackLogo" />
            </Link>

            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className={'nav-text'}>
                <Link to="/tv">
                  <span><PiTelevisionSimple /> E-TV</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/radio">
                  <span><HiOutlineSignal /> E-Radio</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/zine">
                  <span><FaBookBookmark /> E-Zine</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbevents">
                  <span><FaRegCalendarCheck /> PB-Events</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbmall">
                  <span><HiShoppingBag /> PB-Mall</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/defendersofhiphop">
                  <span><LuMic2 /> Defenders of Hip Hop</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/gaming">
                  <span><SiApplearcade /> PB-Gaming</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbdigital">
                  <span><GiSmartphone /> PB-Digital</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbfashion">
                  <span><GiAmpleDress /> PB-Fashion</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbmusic">
                  <span><IoMusicalNotesOutline /> PB-Music</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbcommunities">
                  <span><PiUsersThreeLight /> PB-Communities</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbsocial">
                  <span><LuMessagesSquare /> PB-Social</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/about">
                  <span><IoIosInformationCircle /> About</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/subscribe">
                  <span><CiMail /> Subscribe</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/faq">
                  <span><FaQuestionCircle /> FAQ</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/contactus">
                  <span><BiSolidPhoneCall /> Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;