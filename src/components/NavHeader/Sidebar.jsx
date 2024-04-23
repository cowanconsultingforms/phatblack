import React, { useState, useEffect, useRef } from 'react';
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
import { IoMusicalNotesOutline, IoShare } from "react-icons/io5";
import { GiAmpleDress } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiUsersThreeLight } from "react-icons/pi";
import { LuMessagesSquare } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosInformationCircle } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoHomeSharp } from 'react-icons/io5';
import { FaRegCompass } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiYoutubeFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import PBPremiumLogo from "../../assets/PHATBLACK.png"

function Sidebar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const [subMenu, setSubMenuHover] = useState(false);
  const [socialHover, setSocialHover] = useState(false);
  const [socialPopOut, setSocialPopOut] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  }

  //Function to close sidebar when user clicks off
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)){
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  }

  useEffect(() => {
    document.addEventListener("mouseenter", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseleave", handleOutsideClick)
    };
  },[]);
  //End of function


  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem("accessToken"));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate('/');
    window.location.reload();
  };

  const submenuRef = useRef(null);
  const infoIconRef = useRef(null);
  const socialMediaRef = useRef(null);
  const socialIconRef = useRef(null);

  //handles opening and hiding of submenu
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target) &&
        infoIconRef.current &&
        !infoIconRef.current.contains(event.target)
      ) {
        setSubMenuHover(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  //handles opening and hiding of social submenu
  useEffect(() => {
    const handleSocialMouseMove = (event) => {
      if (
        socialMediaRef.current &&
        !socialMediaRef.current.contains(event.target) &&
        socialIconRef.current &&
        !socialIconRef.current.contains(event.target)
      ) {
        setSocialHover(false);
      }
    };
    document.addEventListener('mousemove', handleSocialMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleSocialMouseMove);
    };
  }, []);


  return (
      <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='Sidebar'>
            <Link to='#' className='menu-bars'>
              <FaBars onClick={showSidebar} />
            </Link>
        </div>

        <div className={sidebar ? 'nav-menu active' : 'nav-menu'} ref={sidebarRef}>
          <div className='SidebarIconsv2'> 
            <Link to='#' className='close'>
              <AiOutlineClose onClick={showSidebar} />
            </Link>

            <Link to="/" >
              <img className="Sidebarlogo" src={PBPremiumLogo} alt="PhatBlackLogo" />
            </Link>

            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className= {'nav-text'}>
              <Link to="/">
                  <span><IoHomeSharp/> Home</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbtv">
                  <span><PiTelevisionSimple /> PB-TV</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbradio">
                  <span><HiOutlineSignal /> PB-Radio</span>
                </Link>
              </li>
              <li className={'nav-text'}>
                <Link to="/pbzine">
                  <span><FaBookBookmark /> PB-Zine</span>
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

        <div className="horizontalBar">
          <div className='SidebarIconsDiv'>
                <ul>
                  <Link to="/">
                    <li><IoHomeSharp/></li>
                  </Link>
                  <li><FaRegCompass onMouseEnter={showSidebar}/></li>
                  <li 
                    onMouseEnter={() => setSubMenuHover(true)}
                    onMouseLeave={() => setSubMenuHover(false)}
                    ref={infoIconRef}>
                    <IoIosInformationCircle onClick={()=>{setSubMenuHover(!subMenu)}}/>
                    {subMenu && (
                      <div
                        className={"submenu-container"}
                        ref={submenuRef}
                      >
                      <ul>
                        <li style={{ marginBottom: '5px', borderBottom: '1px solid #ccc' }}>
                          <p style={{ fontSize: 'medium'}}>PhatBlack is a voice for the voiceless</p>
                        </li>
                        <li>
                          <Link to="/subscribe">
                            <CiMail/>
                          </Link>
                        </li>
                        <li>
                          <Link to="/faq">
                            <FaQuestionCircle />
                          </Link>
                        </li>
                        <li><IoShareSocial 
                          onMouseEnter={() => setSocialHover(true)}
                          onMouseLeave={() => setSocialHover(false)}
                          onClick={()=>{setSocialHover(!socialHover)}}
                          ref={socialMediaRef}
                          />
                          {socialHover && (
                            <div
                              className="social-popout"
                              ref={socialIconRef}
                            >
                                <a href="https://www.facebook.com/phatblackonline"><RiFacebookCircleFill/>Facebook</a>
                                <div>
                                  <a href="https://twitter.com/phatblackonline"><FaSquareXTwitter/>Twitter</a>
                                </div>
                                <div>
                                  <a href="https://www.youtube.com/@PhatBlack-ex7ow"><RiYoutubeFill />YouTube</a>
                                </div>
                                <div>
                                  <a href="https://www.instagram.com/phatblackonline/"><RiInstagramFill />Instagram</a>
                                </div>
                              </div>
                          )}
                        </li>
                        <li>
                          <Link to="/contactus">
                            <BiSolidPhoneCall/>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    )}
                  </li>
                </ul>
              </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;